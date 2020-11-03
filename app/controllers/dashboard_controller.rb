class DashboardController < ApplicationController

  before_action :authenticate_user!

  def user
    render json: current_user
  end

  def index
  end

end
