class Bet < ApplicationRecord

  RESULTS = [:won, :lost, :tie]

  validates :amount, presence: true

  belongs_to :user
  belongs_to :odd
  belongs_to :pool, optional: true

  def payout
    amount * odd.ratio
  end

  def profit
    payout(amount) - amount
  end

  def settle
    return if odd.get_result_or_pending == :pending
    self.result = odd.get_result
    save!
  end

end
