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
    entry = Entry.find_by!(pool_id: bet_attributes[:pool_id], user: bet_attributes[:user])
    bet_attributes[:entry] = entry
    transaction do
      entry.lock!
      raise PickleException::InsufficientFunds if entry.bank < bet_attributes[:amount].to_d
      entry.update!(bank: entry.bank - bet_attributes[:amount].to_d)
      Bet.create!(bet_attributes)
    end
  end

  def settle
    return true if result
    return false if odd.get_result_or_pending == :pending
    transaction do
      self.result = odd.get_result
      if(won?)
        entry.update!(bank: entry.bank + payout)
      elsif(draw?)
        entry.update!(bank: entry.bank + amount)
      end
      save!
    end
  end

end
