class GamesController < ApplicationController

  def index
    render json: {
      games: [
        { home: 'Sporting KC', away: 'Nashville FC', date_time: DateTime.now }
      ]
    }
  end

end
