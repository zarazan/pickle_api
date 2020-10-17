class Odd < ApplicationRecord

  # fixture
  # odd_type - ODD_TYPES
  # ratio - the actual odds of winning/losing that determines how much the payout is
  # metric - the number needed to cover the spread or points to be under/over
  # team_id
  # active

  belongs_to :fixture
  has_many :bets

  validates :odd_type, presence: true
  validates :ratio, presence: true

  ODD_TYPES = [
    :money_line,
    :over,
    :under,
    :spread
  ]

  def self.set_odd(attributes)
    attributes.merge!(active: true)
    transaction do
      duplicate_odd = Odd.find_by(attributes)
      return if duplicate_odd
      active_odds = Odd.where(attributes.slice(:ratio, :metric))
      active_odds.update_all(active: false)
      Odd.create!(attributes)
    end
  end

  # returns :won, :lost, :draw, or :pending
  def get_result_or_pending
    return :pending unless fixture.complete?
    get_result
  end

end
