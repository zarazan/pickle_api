class LoadOddsService

  ODD_TYPES = [
    'h2h',
    'spreads',
    'totals'
  ]

  def self.process
    new.populate_all_sports
  end

  def populate_all_sports
    Pool::SPORTS.each do |sport|
      populate_sport(sport)
    end
  end

  def populate_sport(sport)
    ODD_TYPES.each do |odd_type|
      populate_odds(sport, odd_type)
    end
  end

  def populate_odds(sport, odd_type)
    response = ApiClients::TheOddsApi::Client.new.get_odds(sport, odd_type)
    raise response['msg'] if !response.success?

    fixtures_attributes = response.parse_fixtures
    load_fixtures(fixtures_attributes)
  end

  def load_fixtures(fixtures_attributes)
    fixtures_attributes.each do |fixture_attributes|
      odds_attributes = fixture_attributes.delete(:odds)
      fixture = Fixture.import(fixture_attributes)
      odds_attributes.each do |odd_attributes|
        Odd.import(odd_attributes.merge(fixture: fixture))
      end
    end
  end

end
