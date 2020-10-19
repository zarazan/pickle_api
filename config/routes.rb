Rails.application.routes.draw do

  mount_devise_token_auth_for 'User', at: 'auth'

  get '/' => 'dashboard#index'

  get 'pools/:id' => 'pools#show'
  post '/pools' => 'pools#create'
  patch '/pools/:id' => 'pools#update'
  delete '/pools/:id' => 'pools#delete'
  post '/pools/:id/enter_pool' => 'pools#enter_pool'

end
