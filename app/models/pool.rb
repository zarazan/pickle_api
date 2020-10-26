class Pool < ApplicationRecord

  has_many :bets
  has_many :entries
  belongs_to :user

  validates :name, presence: true
  validates :start_date, presence: true
  validates :end_date, presence: true
  validates :bankroll, presence: true

  validate :validate_bet_types
  validate :validate_sport_types

  BET_TYPES = [
    :money_line,
    :total_points,
    :spread
  ]

  SPORTS = [
    'americanfootball_ncaaf',
    'americanfootball_nfl',
    'baseball_mlb',
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

  private

  def validate_bet_types
    invalid_bet_types = self.bet_types - BET_TYPES
    if invalid_bet_types.any?
      errors.add(:bet_types, "#{invalid_bet_types.join(' ')} are invalid")
    end
  end

  def validate_sport_types
    invalid_sports = self.sports - SPORTS
    if invalid_sports.any?
      errors.add(:sports, "#{invalid_sports.join(' ')} are invalid")
    end
  end

end
