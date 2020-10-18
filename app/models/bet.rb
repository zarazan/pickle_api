class Bet < ApplicationRecord

  RESULTS = [:won, :lost, :tie]

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

  def tie?
    result.to_sym == :tie
  end

  def place_bet(bet_attributes)
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
      elsif(result.tie?)
        entry.update!(bank: bank + amount)
      end
      save!
    end
  end

end
