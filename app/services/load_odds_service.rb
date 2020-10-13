class LoadOddsService
 
  SPORTS = [
    'americanfootball_ncaaf',
    'americanfootball_nfl',
    'soccer_epl',
  ]

  ODD_TYPE_MAPPING = {
    money_line: 'h2h',
    spread: 'spreads',
    over: 'totals',
    under: 'totals'
  }

  def self.process
    new.populate_odds
  end

  def populate_odds
    SPORTS.each do |sport|
      populate_odds_for_sport(sport)
    end
  end

  def populate_odds_for_sport(sport)
    api_response = ApiClients::TheOddsApi.new.get_odds(sport, 'h2h')
    raise 'API Request Failed' if !api_response.success?

    fixtures_attributes = api_response.parse_fixtures
    fixtures_attributes.each do |fixture_attributes|
      odds_attributes = fixture_attributes.delete(:odds)
      fixture = Fixture.find_or_create_by(fixture_attributes)
      odds_attributes.each do |odd_attributes|
        Odd.find_or_create_by(odd_attributes.merge(fixture: fixture))
      end
    end
  end

end
