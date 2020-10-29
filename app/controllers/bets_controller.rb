class BetsController < ApplicationController

  before_action :authenticate_user!

  def create
    @bet = Bet.place_bet(bet_params.merge(user: current_user))
    render json: @bet
  end

  def pool_bets
    @bets = current_user.bets.where(pool_id: params[:pool_id])
  end

  private

  def bet_params
    params.require(:bet).permit(:pool_id, :odd_id, :amount)
  end

end
