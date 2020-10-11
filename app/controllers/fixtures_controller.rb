class FixturesController < ApplicationController

  def index
    @fixtures = Fixture.order('start_time desc').limit(10)
    render json: @fixtures
  end

end
