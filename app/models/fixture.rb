class Fixture < ApplicationRecord

  # sport
  # start_time
  # home_score
  # away_score
  # status

  FIXTURE_STATUS = [:home_win, :away_win, :draw, :in_process, :scheduled, :cancelled]

  SPORTS = [
    'americanfootball_nfl',
    'americanfootball_ncaaf',
    'baseball_mlb'
  ]

  validates :sport, presence: true
  validates :start_time, presence: true

  belongs_to :home_team, class_name: 'Team'
  belongs_to :away_team, class_name: 'Team'

  has_many :odds
  has_many :bets

  scope :locked, -> { where('start_time < ?', DateTime.current) }

  def self.import(attributes)
    sport = attributes[:sport]
    attributes[:home_team] = Team.find_or_create_by(name: attributes.delete(:home_team_name), sport: sport)
    attributes[:away_team] = Team.find_or_create_by(name: attributes.delete(:away_team_name), sport: sport)
    fixture = Fixture.find_by(attributes)
    return fixture if fixture
    attributes.merge!(status: :scheduled)
    Fixture.create(attributes)
  end

  def change_status!(new_status)
    return if status == new_status

    if status == 'scheduled' && new_status == 'in_progress'
      update!(status: new_status)
      return
    end

    if ['scheduled', 'in_progress'].include?(status) && ['home_win', 'away_win', 'draw'].include?(new_status)
      update!(status: new_status)
      settle_bets
      return
    end

    if ['home_win', 'away_win', 'draw'].include?(status) && new_status == 'in_progress'
      unsettle_bets
      update!(status: new_status)
      return
    end

    if ['scheduled', 'in_progress'].include?(status) && new_status == 'cancelled'
      update!(status: new_status)
      unwind_bets
      return
    end
  end

  def settle_bets
    odds.each do |odd|
      odd.bets.map(&:settle)
    end
  end

  def unsettle_bets
    odds.each do |odd|
      odd.bets.map(&:unsettle)
    end
  end

  def unwind_bets
    odds.each do |odd|
      odd.bets.map(&:unwind)
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
    [:home_win, :away_win, :draw].include?(status.to_sym)
  end

  def locked?
    start_time < DateTime.current
  end

  def get_team_by_name(team_name)
    [home_team, away_team].find { |team| team.name == team_name }
  end

  def as_json(options = {})
    super.merge({
      locked: locked?,
      homeTeamName: home_team.name,
      awayTeamName: away_team.name,
    })
  end

end
