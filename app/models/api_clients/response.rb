module ApiClients
  class Response

    # This is specific to The-Odds-API and should be
    # split up when another api is added to parse odds

    attr_reader :response, :odd_type

    PREFFERED_ODDS_SOURCE = [
      :draftkings,
      :fanduel,
      :betmgm
    ]

    def initialize(response, odd_type = nil)
      @response = response
      @odd_type = odd_type
    end

    def success?
      response['success'] == true
    end

    def parse_fixtures
      response['data'].map do |fixture_json|
        parse_fixture(fixture_json)
      end
    end

    def parse_fixture(fixture_json)
      home_team = fixture_json['home_team']
      away_team = fixture_json['teams'].find { |name| name != home_team }
      start_time = DateTime.parse(fixture_json['commence_time'].to_s)

      fixture = {
        home_team: home_team,
        away_team: away_team,
        start_time: start_time,
        odds: self.send("parse_#{odd_type}_odds", fixture_json)
      }
    end

    def parse_h2h_odds(fixture_json)
      sites = fixture_json['sites']
      site = sites.find { |site| PREFFERED_ODDS_SOURCE.include?(site['site_key']) }
      site ||= sites.first
      [0, 1].map do |index|
        {
          odd_type: :money_line,
          ratio: site['odds']['h2h'][index],
          team: fixture_json['teams'][index]
        }
      end
    end

    def parse_spreads_odds(fixture_json)
    end

  end
end
