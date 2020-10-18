class Fixture < ApplicationRecord

  # sport
  # start_time
  # home_score
  # away_score
  # status

  FIXTURE_STATUS = [:home_win, :away_win, :tie, :in_process, :scheduled]

  validates :sport, presence: true
  validates :home_team_id, presence: true
  validates :away_team_id, presence: true
  validates :start_time, presence: true

  has_many :odds

  def self.find_or_create_with_status(attributes)
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

  def tie?
    status.to_sym == :tie
  end

  def complete?
    [:home_win, :away_win, :tie].include?(status)
  end

end
