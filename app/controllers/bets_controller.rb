class BetsController < ApplicationController

  before_action :authenticate_user!

  def create
    @bet = Bet.place_bet(bet_params.merge(user: current_user))
  end

  def pool_bets
    # All bets of games that have started
    @pool = Pool.find(params[:id])
    @bets = @pool.fixtures.locked.
  end

  def my_bets
    @bets = current_user.bets.where(pool_id: params[:id])
    render :pool_bets
  end

  private

  def bet_params
    params.require(:bet).permit(:pool_id, :odd_id, :amount)
  end

end
