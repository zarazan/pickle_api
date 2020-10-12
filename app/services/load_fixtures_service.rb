class LoadFixturesService
 
  NFL = 'americanfootball_nfl'

  ODDS_SOURCE_PRIORITY = [
    :draftkings,
    :fanduel,
    :betmgm
  ]

  attr_reader :response

  def self.process
    new.populate_fixtures_and_odds
  end

  def populate_fixtures_and_odds
    @response ||= ApiClients::TheOddsApi.new.get_fixtures(NFL, 'h2h')
    raise 'FUCK' if response['success'] != true
    response['data'].each do |fixture_json|
      find_or_create_fixture(fixture_json)
    end
  end

  # Currently specific to only h2h results
  def find_or_create_fixture(fixture_json)
    teams = fixture_json['teams']
    home_team = fixture_json['home_team']
    away_team = teams.find { |name| name != home_team }
    start_time = DateTime.parse(fixture_json['commence_time'].to_s)

    fixture = Fixture.find_or_create_by(
      home_team: home_team,
      away_team: away_team,
      start_time: start_time
    )

    sites = fixture_json['sites']
    site = sites.find { |site| ODDS_SOURCE_PRIORITY.include?(site['site_key']) }
    site ||= sites.first
    [0, 1].each do |index|
      Odd.find_or_create_by(
        fixture: fixture,
        odd_type: :money_line,
        ratio: site['odds']['h2h'][index],
        team: teams[index]
      )
    end
  end

end
