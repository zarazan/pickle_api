class LoadFixtureService

  API_KEY = '0a693a1c3ba0561be54cddd459499775'
  SPORT = 'americanfootball_nfl'
  REGION = 'us'

  attr_accessor :response

  def get_nfl_games
    response ||= client.get('odds') do |request|
      request.params['region'] = REGION
      request.params['sport'] = SPORT
    end
  end

  def client
    Faraday.new(
      url: 'https://api.the-odds-api.com/v3/',
      params: { api_key: API_KEY }
    )
  end

end
