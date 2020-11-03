class DashboardController < ApplicationController

  def user
    render json: current_user
  end

  def index
  end

end
