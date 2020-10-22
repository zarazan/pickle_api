class PoolsController < ApplicationController

  before_action :authenticate_user!
  before_action :set_pool, only: [:update, :destroy]

  def index
    @pools = Pool.joins(:entries).where(entries: {user_id: current_user.id})
    render json: @pools
  end

  def show
    @pool = current_user.entries.find_by(pool_id: params[:id])&.pool
    render json: @pool
  end

  def create
    @pool = Pool.create_and_enter(pool_params.merge(user: current_user))
    if @pool.errors.empty?
      render json: @pool
    else
      render json: @pool.errors, status: 422
    end
  end

  def update
    if @pool.update(pool_params)
      render json: @pool
    else
      render json: @pool.errors, status: 422
    end
  end

  def destroy
    @pool.destroy
    head :no_content
  end

  def enter_pool
    @pool = Pool.find(params[:id])
    if @pool.enter_pool(current_user)
      render json: @pool
    else
      render json: @pool.errors, status: 422
    end
  end

  private

  def set_pool
    @pool = current_user.pools.find(params[:id])
  end

  def pool_params
    params.require(:pool).permit(
      :name, :start_date, :end_date,
      :bankroll, :bet_types, :sports, :private, :email_invites
    )
  end

end
