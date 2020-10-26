class Pool < ApplicationRecord

  has_many :bets
  has_many :entries
  belongs_to :user

  validates :name, presence: true
  validates :start_date, presence: true
  validates :end_date, presence: true
  validates :bankroll, presence: true
  # validates :bet_types_validation
  # validates :sports_validation

  BET_TYPES = [
    :money_line,
    :total_points,
    :spread
  ]

  def self.create_and_enter(attributes)
    user = attributes[:user]
    attributes[:private] = true

    # TODO - validate attributes[:bet_types]

    # TODO - date = turn into start and end of day

    # MVP - REMOVE AFTER
    attributes[:email_invites] = User.the_first_four.map(&:email)

    pool = user.pools.new(attributes)
    return pool unless pool.save
    pool.enter_pool(user)

    # MVP - REMOVE AFTER
    User.the_first_four.each { |user| pool.enter_pool(user) }

    pool
  end

  def enter_pool(user)
    if !email_invites.include?(user.email)
      self.errors << PickleException::UnauthorizedEntry.new.message
      return false
    end
    return true if Entry.find_by(user: user, pool: self)
    Entry.create(user: user, pool: self, bank: bankroll)
  end

end
