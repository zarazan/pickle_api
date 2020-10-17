class SettleBetService

  def self.process
    Fixture.first.settle_bets
  end

end
