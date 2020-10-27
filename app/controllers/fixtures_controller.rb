class FixturesController < ApplicationController

  def pool_fixtures
    @pool = Pool.find(params[:id])
    @start_after = params[:start_after]
    @start_before = params[:start_before]
  end

end
