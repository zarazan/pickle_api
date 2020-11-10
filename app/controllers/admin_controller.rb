class AdminController < ApplicationController

  def fixtures
    @pool = Pool.find(params[:pool_id])
  end

end
