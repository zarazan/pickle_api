module ApiClients::TheOddsApi
  class Client

    API_KEY = '0a693a1c3ba0561be54cddd459499775'

    def get_odds(sport_key, odd_type)
      response = http_client.get('odds') do |request|
        request.params['sport'] = sport_key
        request.params['mkt'] = odd_type
        request.params['region'] = 'us'
        request.params['dateFormat'] = 'iso'
      end
      Response.new(response.body, odd_type)
    end

    def get_sports
      response = http_client.get('sports')
      response.body['data']
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
end
