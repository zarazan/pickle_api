class Fixture < ApplicationRecord

  validates :sport, presence: true
  validates :home_team, presence: true
  validates :away_team, presence: true
  validates :start_time, presence: true

  has_many :odds

end
