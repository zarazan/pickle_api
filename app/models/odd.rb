class Odd < ApplicationRecord

  # fixture
  # odd_type - ODD_TYPES
  # ratio - the actual odds of winning/losing that determines how much the payout is
  # metric - the number needed to cover the spread or points to be under/over
  # team_id
  # active

  belongs_to :fixture
  belongs_to :team, optional: -> { !team_is_required }

  has_many :bet_odds
  has_many :bets, through: :bet_odds

  validates :ratio, presence: true

  scope :active, ->{ where(active: true) }

  ODD_TYPES = [
    :money_line,
    :over,
    :under,
    :spread
  ]

  def pending?
    !fixture.complete?
  end

  def locked?
    fixture.locked?
  end

  def odd_type
    self.class.name.underscore.chomp('_odd')
  end

  def self.import(attributes)
    attributes.merge!(active: true)

    team_name = attributes.delete(:team_name)
    fixture = attributes[:fixture]

    attributes[:team] = fixture.get_team_by_name(team_name)

    duplicate_odd = Odd.find_by(attributes)
    return duplicate_odd if duplicate_odd

    transaction do
      active_odds = Odd.where(attributes.slice(:fixture, :type, :ratio, :metric, :team))
      active_odds.update_all(active: false)
      return Odd.create!(attributes)
    end
  end

  def won?
    get_result_or_pending == :won
  end

  def draw?
    get_result_or_pending == :draw
  end

  def lost?
    get_result_or_pending == :lost
  end

  def won_or_draw?
    [:won, :draw].include?(get_result_or_pending)
  end

  # returns :won, :lost, :draw, or :pending
  def get_result_or_pending
    return :pending if pending?
    get_result
  end

  def team_is_required
    false
  end

  def self.to_american(ratio)
    if ratio >= 2
      ((ratio - 1) * 100).round
    else
      ((-100) / (ratio - 1)).round
    end
  end

  def american
    self.class.to_american(ratio)
  end

  def as_json(options = {})
    super.merge({
      type: odd_type,
      teamName: team&.name,
      american: american,
      result: get_result_or_pending,
    })
  end

end
