class SpreadOdd < Odd

  def get_result
    net_score = team_bet_on_score + metric
    return :draw if net_score == team_bet_against_score
    net_score > team_bet_against_score ? :won : :lost
  end

  def team_bet_on_score
    team_is_home? ? fixture.home_score : fixture.away_score
  end

  def team_bet_against_score
    team_is_away? ? fixture.away_score : fixture.home_score
  end

  def team_is_home?
    fixture.home_team == team
  end

  def team_is_away?
    fixture.away_team == team
  end

end
