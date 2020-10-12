class ApiClients::TheOddsApi

  API_KEY = '0a693a1c3ba0561be54cddd459499775'
  REGION = 'us'

  def get_fixtures(sport_key)
    http_client.get('odds') do |request|
      request.params['region'] = REGION
      request.params['sport'] = sport_key
    end.body
  end

  def http_client
    Faraday.new(
      url: 'https://api.the-odds-api.com/v3/',
      params: { api_key: API_KEY }
    ) do |faraday|
      faraday.response :json
    end
  end

end
