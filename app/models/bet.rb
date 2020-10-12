class Bet < ApplicationRecord

  belongs_to :odd

  def payout
    odd.payout(amount)
  end

end
