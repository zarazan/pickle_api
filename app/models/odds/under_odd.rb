class UnderOdd < Odd

  def get_result
    return :draw if fixture.total_score == metric
    fixture.total_score < metric ? :won : :lost
  end

end
