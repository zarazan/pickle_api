class LoadFixturesService

  NFL = 'americanfootball_nfl'

  attr_reader :response

  def get_nfl_games
    @response ||= ApiClients::TheOddsApi.new.get_fixtures(NFL)
  end

end
