class Pool < ApplicationRecord

  has_many :bets
  has_many :entries
  belongs_to :user

  def enter_pool(user)
    if !emails.include?(user.email)
      self.errors << 'Unauthorized'
      return false
    end
    return true if Entry.find_by(user: user, pool: self)
    Entry.create(user: user, pool: self, bank: bankroll)
  end

end
