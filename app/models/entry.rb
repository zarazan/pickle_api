class Entry < ApplicationRecord

  belongs_to :pool
  belongs_to :user
  has_many :bets

  def bankroll_plus_active_bets
    bank + bets.where(result: nil).sum(&:amount)
  end

end
