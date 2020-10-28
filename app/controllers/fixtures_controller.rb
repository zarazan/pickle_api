class FixturesController < ApplicationController

  def pool_fixtures
    @pool = current_user.entries.find_by(pool_id: params[:id])&.pool
    @start_after = params[:start_after]
    @start_before = params[:start_before]
  end

end
