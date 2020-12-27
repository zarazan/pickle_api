class BetsController < ApplicationController

  before_action :authenticate_user!

  def create
    @bet = Bet.place_bet(bet_params.merge(user: current_user))
  end

  def pool_bets
    @bets = current_user.bets.where(pool_id: params[:id])
  end

  private

  def bet_params
    params.require(:bet).permit(:pool_id, :amount, odd_id, odd_ids:[])
  end

end
