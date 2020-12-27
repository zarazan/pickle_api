class Bet < ApplicationRecord

  RESULTS = [:won, :lost, :draw]

  validates :amount, presence: true

  belongs_to :user
  belongs_to :pool
  belongs_to :entry

  has_many :bet_odds
  has_many :odds, through: :bet_odds

  def ratio
    return odds.first.ratio if odds.one?
    non_draw_odds = odds.select { |odd| odd.get_result_or_pending != :draw}
    non_draw_odds.reduce(1, :*).round(4)
  end

  def payout
    amount * ratio
  end

  def profit
    payout(amount) - amount
  end

  def pending?
    odds.any?(&:pending?)
  end

  def won?
    odds.any?(&:won?) && odds.all?(&:won_or_draw?)
  end

  def draw?
    odds.all?(&:draw?)
  end

  def lost?
    odds.any?(&:lost?)
  end

  def get_result
    return :won if won?
    return :draw if draw?
    return :lost if lost?
  end

  def self.place_bet(bet_attributes)
    entry = Entry.find_by!(pool_id: bet_attributes[:pool_id], user: bet_attributes[:user])
    bet_attributes[:entry] = entry

    if bet_attributes[:odd_id]
      odds = [Odd.find(bet_attributes[:odd_id])]
    else
      odds = Odd.find_by!(odd_id: bet_attributes.delete(:odd_ids))
      bet_attributes[:odds] = odds
    end

    transaction do
      entry.lock!
      raise PickleException::InsufficientFunds if entry.bank < bet_attributes[:amount].to_d
      entry.update!(bank: entry.bank - bet_attributes[:amount].to_d)
      bet = Bet.create!(bet_attributes)
      bet.odds = odds
      bet
    end
  end

  def settle
    return true if result
    return false if pending?
    transaction do
      self.result = get_result
      if(won?)
        entry.update!(bank: entry.bank + payout)
      elsif(draw?)
        entry.update!(bank: entry.bank + amount)
      end
      save!
    end
  end

  def as_json(options = {})
    super.merge({
      payout: payout
    })
  end

end
