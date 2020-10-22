class FixturesController < ApplicationController

  def index
    params[:pool_id]
    @fixtures = Fixture.order('start_time desc').limit(10)
    render json: @fixtures
  end

end
