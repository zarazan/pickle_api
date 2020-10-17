class MoneyLineOdd < Odd

  def get_result
    return :tie if fixture.tie?
    team == fixture.winning_team ? :won : :lost
  end

end
