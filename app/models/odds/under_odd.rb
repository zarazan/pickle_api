class UnderOdd < Odd

  def get_result
    return :tie if fixture.total_score == metric
    fixture.total_score < metric ? :won : :lost
  end

end
