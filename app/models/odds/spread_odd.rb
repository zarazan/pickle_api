class SpreadOdd < Odd

  def get_result
    bet_on_team_score = fixture.send("#{team_is_home_or_away}_score")
  end

  def team_bet_on_score
  end

  def team_bet_against_score
  end

  def team_is_home_or_away
    if fixture.home_team == team
      :home
    elsif fixture.away_team == team
      :away
    else
      raise 'Fixture does not include team'
    end
  end

end
