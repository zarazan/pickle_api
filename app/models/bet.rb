class Bet < ApplicationRecord

  validates :amount, presence: true

  belongs_to :odd
  belongs_to :pool, optional: true
  # belongs_to :user

  def payout
    amount * odd.ratio
  end

  def profit
    payout(amount) - amount
  end

end
