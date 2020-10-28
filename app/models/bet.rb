class Bet < ApplicationRecord

  RESULTS = [:won, :lost, :draw]

  validates :amount, presence: true

  belongs_to :user
  belongs_to :odd
  belongs_to :pool
  belongs_to :entry

  def payout
    amount * odd.ratio
  end

  def profit
    payout(amount) - amount
  end

  def won?
    result.to_sym == :won
  end

  def draw?
    result.to_sym == :draw
  end

  def self.place_bet(bet_attributes)
    bet_attributes[:entry] = Entry.find_by(pool_id: bet_attributes[:pool_id], user: bet_attributes[:user])
    transaction do
      entry.update!(bank: bank - bet_attributes[:amount])
      Bet.create!(bet_attributes)
    end
  end

  def settle
    return if result
    return if odd.get_result_or_pending == :pending
    transaction do
      self.result = odd.get_result
      if(result.won?)
        entry.update!(bank: bank + payout)
      elsif(result.draw?)
        entry.update!(bank: bank + amount)
      end
      save!
    end
  end

end
