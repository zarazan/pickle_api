module ApiClients::TheOddsApi
  class Response

    attr_reader :response, :odd_type

    PREFFERED_ODDS_SOURCE = [
      :draftkings,
      :fanduel,
      :betmgm,
      :bovada
    ]

    def initialize(response, odd_type)
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
      sport = fixture_json['sport_key']
      home_team = fixture_json['home_team']
      away_team = fixture_json['teams'].find { |name| name != home_team }
      start_time = DateTime.parse(fixture_json['commence_time'].to_s)

      fixture = {
        sport: sport
        home_team_name: home_team,
        away_team_name: away_team,
        start_time: start_time,
        odds: get_odds(fixture_json)
      }
    end

    def get_odds(fixture_json)
      site = get_site(fixture_json)
      return [] if !site
      send("parse_#{odd_type}_odds", fixture_json, site)
    end

    def get_site(fixture_json)
      sites = fixture_json['sites']
      site = sites.find { |site| PREFFERED_ODDS_SOURCE.include?(site['site_key']) }
      site || sites.first
    end

    def parse_h2h_odds(fixture_json, site)
      [0, 1].map do |index|
        {
          type: 'MoneyLineOdd',
          ratio: site['odds']['h2h'][index],
          team: fixture_json['teams'][index]
        }
      end
    end

    def parse_spreads_odds(fixture_json, site)
      [0, 1].map do |index|
        {
          type: 'SpreadOdd',
          ratio: site['odds']['spreads']['odds'][index],
          team: fixture_json['teams'][index],
          metric: site['odds']['spreads']['points'][index]
        }
      end
    end

    def parse_totals_odds(fixture_json, site)
      [0, 1].map do |index|
        odd_type = site['odds']['totals']['position'] == 'over' ? 'OverOdd' : 'UnderOdd'
        {
          type: odd_type,
          ratio: site['odds']['totals']['odds'][index],
          metric: site['odds']['totals']['points'][index]
        }
      end
    end

  end
end
