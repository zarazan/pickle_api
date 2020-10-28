class EntriesController < ApplicationController

  before_action :authenticate_user!

  def pool_entries
    @pool = current_user.entries.find_by(pool_id: params[:id])&.pool
  end

end
