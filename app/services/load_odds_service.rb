class LoadOddsService
 
  SPORTS = [
    'americanfootball_ncaaf',
    'americanfootball_nfl',
    'soccer_epl',
  ]

  ODD_TYPES = [
    'h2h',
    'spreads',
    'totals'
  ]

  def self.process
    new.populate_all_odds
  end

  def populate_all_odds
    SPORTS.each do |sport|
      ODD_TYPES.each do |odd_type|
        populate_odds(sport, odd_type)
      end
    end
  end

  def populate_odds(sport, odd_type)
    response = ApiClients::TheOddsApi::Client.new.get_odds(sport, odd_type)
    raise 'API Request Failed' if !response.success?

    fixtures_attributes = response.parse_fixtures
    load_fixtures(fixtures_attributes)
  end

  def load_fixtures(fixtures_attributes)
    fixtures_attributes.each do |fixture_attributes|
      odds_attributes = fixture_attributes.delete(:odds)
      fixture = Fixture.find_or_create_with_status(fixture_attributes)
      odds_attributes.each do |odd_attributes|
        Odd.set_odd(odd_attributes.merge(fixture: fixture))
      end
    end
  end

end
