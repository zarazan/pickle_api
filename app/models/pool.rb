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
    'money_line',
    'total_points',
    'spread'
  ]

  SPORTS = [
    'americanfootball_ncaaf',
    'americanfootball_nfl',
    'baseball_mlb',
    'icehockey_nhl'
  ]

  def self.create_and_enter(attributes)
    user = attributes.delete(:user)
    pool = user.pools.new(attributes)
    return pool unless pool.save
    pool.enter_pool(user)
    pool
  end

  def enter_pool(user)
    existing_entry = get_entry_for_user(user)
    return existing_entry if existing_entry
    Entry.create(user: user, pool: self, bank: bankroll)
  end

  def fixtures
    Fixture.where('start_time > ? AND start_time < ?', start_date, end_date).where(sport: sports)
  end

  def get_entry_for_user(user)
    entries.find_by(user: user)
  end

  private

  def validate_bet_types
    if bet_types.blank?
      errors.add(:bet_types, "must include at least one valid bet type")
      return
    end
    invalid_bet_types = bet_types - BET_TYPES
    if invalid_bet_types.any?
      errors.add(:bet_types, "#{invalid_bet_types.join(' ')} are invalid")
    end
  end

  def validate_sport_types
    if sports.blank?
      errors.add(:sports, "must include at least one valid sport")
      return
    end
    invalid_sports = sports - SPORTS
    if invalid_sports.any?
      errors.add(:sports, "#{invalid_sports.join(' ')} are invalid")
    end
  end

end
