class BetsController < ApplicationController

  before_action :authenticate_user!

  def create
    @bet = Bet.place_bet(bet_params.merge(user: current_user))
  end

  def pool_bets
    @bets = Pool.find(params[:id]).bets.includes(odds: [:team, fixture: [:home_team, :away_team]])
    @bets = @bets.where(user_id: params[:user_id]) if params[:user_id].present?
    @bets = @bets.to_a

    if params[:fixture_id].present?
      @bets.select! do |bet|
        bet.odds.any? { |odd| odd.fixture_id == params[:fixture_id].to_i }
      end
    end

    @bets.select! do |bet|
      bet.user_id == current_user.id || bet.public?
    end
  end

  private

  def bet_params
    params.require(:bet).permit(:pool_id, :amount, :odd_id, odd_ids:[])
  end

end
