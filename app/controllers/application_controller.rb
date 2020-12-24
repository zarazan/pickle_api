class ApplicationController < ActionController::API

  include DeviseTokenAuth::Concerns::SetUserByToken

  before_action :make_slow

  def fallback_index_html
    render :file => 'public/index.html'
  end

  def make_slow
    sleep 2
  end

end
