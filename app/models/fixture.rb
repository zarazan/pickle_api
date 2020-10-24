class Fixture < ApplicationRecord

  # sport
  # start_time
  # home_score
  # away_score
  # status

  FIXTURE_STATUS = [:home_win, :away_win, :draw, :in_process, :scheduled]

  SPORTS = [
    'americanfootball_nfl',
    'americanfootball_ncaaf',
    'soccer_epl'
  ]

  validates :sport, presence: true
  validates :start_time, presence: true

  belongs_to :home_team, class: 'Team'
  belongs_to :away_team, class: 'Team'

  has_many :odds

  def self.find_or_create_with_status(attributes)
    sport = attributes[:sport]
    attributes[:home_team] = Team.find_or_create_by(name: attributes.delete(:home_team_name), sport: sport)
    attributes[:away_team] = Team.find_or_create_by(name: attributes.delete(:away_team_name), sport: sport)
    fixture = Fixture.find_by(attributes)
    return fixture if fixture
    attributes.merge!(status: :scheduled)
    Fixture.create(attributes)
  end

  def settle_bets
    odds.each do |odd|
      odd.bets.map(&:settle)
    end
  end

  def winning_team
    case status.to_sym
    when :home_win
      home_team
    when :away_win
      away_team
    end
  end

  def total_score
    home_score + away_score
  end

  def draw?
    status.to_sym == :draw
  end

  def complete?
    [:home_win, :away_win, :draw].include?(status)
  end

end
