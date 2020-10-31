class Odd < ApplicationRecord

  # fixture
  # odd_type - ODD_TYPES
  # ratio - the actual odds of winning/losing that determines how much the payout is
  # metric - the number needed to cover the spread or points to be under/over
  # team_id
  # active

  belongs_to :fixture
  has_many :bets
  belongs_to :team

  validates :ratio, presence: true

  scope :active, ->{ where(active: true) }

  ODD_TYPES = [
    :money_line,
    :over,
    :under,
    :spread
  ]

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
      return Odd.create(attributes)
    end
  end

  # returns :won, :lost, :draw, or :pending
  def get_result_or_pending
    return :pending unless fixture.complete?
    get_result
  end

  def as_json(options = {})
    super.merge({
      type: odd_type,
      team_name: team.name
    })
  end

end
