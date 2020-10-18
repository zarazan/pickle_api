class MoneyLineOdd < Odd

  def get_result
    return :draw if fixture.draw?
    team == fixture.winning_team ? :won : :lost
  end

end
