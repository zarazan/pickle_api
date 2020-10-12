class Odd < ApplicationRecord

  # type - ODD_TYPES
  # ratio - the actual odds of winning/losing that determines how much the payout is
  # metric - the number needed to cover the spread or points to be under/over
  # team
  # player
  # active

  ODD_TYPES = [
    :money_line
    :over,
    :under,
    :spread
  ]

  belongs_to :fixture
  has_many :bets

  def payout(amount)
    amount * ratio
  end

end
