class AdminController < ApplicationController

  def fixtures
    @fixtures = Pool.find(params[:pool_id]).fixtures
  end

  def update_fixtures
    @fixtures = fixtures_params.map do |fixture_params|
      fixture = Fixture.find(fixture_params[:id])
      fixture.update!(fixture_attributes(fixture_params))
      fixture
    end
    render :fixtures
  end

  private

  def fixtures_params
    params.require(:fixtures)
  end

  def fixture_attributes(fixture_params)
    {
      home_score: fixture_params[:homeScore],
      away_score: fixture_params[:awayScore],
    }
  end

end
