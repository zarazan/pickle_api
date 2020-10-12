class ApiClients::TheOddsApi

  API_KEY = '0a693a1c3ba0561be54cddd459499775'
  REGION = 'us'

  TYPES = [

  ]

  def get_fixtures(sport_key, odd_type = 'h2h')
    http_client.get('odds') do |request|
      request.params['region'] = REGION
      request.params['sport'] = sport_key
      request.params['mkt'] = odd_type
      request.params['dateFormat'] = 'iso'
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
