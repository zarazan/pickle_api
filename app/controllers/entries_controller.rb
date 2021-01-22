class EntriesController < ApplicationController

  before_action :authenticate_user!

  def pool_entries
    # private
    # @pool = current_user.entries.find_by(pool_id: params[:id])&.pool

    # public
    @pool = Pool.find(params[:id])
  end

end
