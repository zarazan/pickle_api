class GamesController < ApplicationController

  def index
    @games = Game.order('start_time desc').limit(10)
    render json: @games
  end

end
