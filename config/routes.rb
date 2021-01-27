Rails.application.routes.draw do

  constraints(host: 'pickle-skin.herokuapp.com') do
    # root to: redirect('https://www.pickle-skin.com/')
    # match '*path', to: redirect('https://www.pickle-skin.com/'), via: :all

    match '*', to: redirect('https://www.pickle-skin.com/'), via: :all
  end

  mount_devise_token_auth_for 'User', at: 'auth'

  scope '/api' do
    defaults format: :json do
      get '/' => 'dashboard#index'
      get '/user' => 'dashboard#user'

      get '/pools' => 'pools#index'
      get '/pools/:id' => 'pools#show'
      post '/pools' => 'pools#create'
      patch '/pools/:id' => 'pools#update'
      delete '/pools/:id' => 'pools#delete'

      post '/pools/:id/enter_pool' => 'pools#enter_pool'

      get '/pools/:id/fixtures' => 'fixtures#pool_fixtures'
      get '/pools/:id/entries' => 'entries#pool_entries'

      post '/bets' => 'bets#create'
      get '/pools/:id/bets' => 'bets#pool_bets'

      get '/teams' => 'teams#index'

      get '/admin/pools/:pool_id/fixtures' => 'admin#fixtures'
      patch '/admin/fixtures' => 'admin#update_fixtures'
    end
  end

  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end

end
