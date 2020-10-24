Rails.application.routes.draw do

  mount_devise_token_auth_for 'User', at: 'auth'

  defaults format: :json do
    get '/' => 'dashboard#index'

    get '/pools' => 'pools#index'
    get '/pools/:id' => 'pools#show'
    post '/pools' => 'pools#create'
    patch '/pools/:id' => 'pools#update'
    delete '/pools/:id' => 'pools#delete'
    post '/pools/:id/enter_pool' => 'pools#enter_pool'
    get '/pools/:id/fixtures' => 'pools#fixtures'
    get '/pools/:id/entries' => 'pools#entries'
  end

end
