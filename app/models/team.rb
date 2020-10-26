class Team < ApplicationRecord

  has_many :home_fixtures, class_name: 'Fixture', foreign_key: 'home_team_id'
  has_many :away_fixtures, class_name: 'Fixture', foreign_key: 'away_team_id'

  validtates :name, presence: true
  validates :sport, presence: true

end
