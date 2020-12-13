class Entry < ApplicationRecord

  belongs_to :pool
  belongs_to :user
  has_many :bets

  def bankroll_plus_active_bets
    bank + active_bets.sum(&:amount)
  end

  def active_bets
    bets.select { |bet| bet.result.nil? }
  end

end
