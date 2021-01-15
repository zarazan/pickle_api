require 'test_helper'

class BetTest < ActiveSupport::TestCase

  describe '.settle_bet' do
    before do
      @pool = Pool.new
      @pool.save!(validate: false)

      @user = User.new(email: "#{SecureRandom.uuid}@domain.com")
      @user.save!(validate: false)

      @entry = Entry.create!(user: @user, pool: @pool, bank: 500)

      @fixture = Fixture.import({
        sport: 'americanfootball_nfl', 
        start_time: DateTime.current + 1.day,
        home_team_name: 'Chiefs',
        away_team_name: 'Steelers'
      })

      @odd = Odd.import({
        fixture: @fixture,
        type: MoneyLineOdd.name,
        ratio: 1.5,
        team_name: 'Chiefs'
      })

      @bet = Bet.place_bet({
        user: @user,
        pool_id: @pool.id,
        odd_id: @odd.id,
        amount: 50
      })
    end

    it 'settles a winning money_line bet' do
      assert_equal 450.0, @entry.reload.bank
      @fixture.change_status!('home_win')
      assert_equal 525, @entry.reload.bank
    end

    it 'settles a winning spread bet' do
      @odd.update(type: SpreadOdd.name, metric: -10)
      @fixture.update(home_score: 52, away_score: 7)
      @fixture.change_status!('home_win')
      assert_equal 525, @entry.reload.bank
    end

    it 'settles an over bet' do
      @odd.update(type: OverOdd.name, metric: 55, team: nil)
      @fixture.update(home_score: 52, away_score: 7)
      @fixture.change_status!('home_win')
      assert_equal 525, @entry.reload.bank
    end

    it 'settles an under bet' do
      @odd.update(type: UnderOdd.name, metric: 60, team: nil)
      @fixture.update(home_score: 52, away_score: 7)
      @fixture.change_status!('home_win')
      assert_equal 525, @entry.reload.bank
    end

    it 'settles a parlay money_line and under bet' do
      @odd2 = Odd.import({fixture: @fixture, type: UnderOdd.name, ratio: 1.7, metric: 60})
      @bet = Bet.place_bet({
        user: @user,
        pool_id: @pool.id,
        odd_ids: [@odd.id, @odd2.id],
        amount: 50
      })

      @fixture.update(home_score: 52, away_score: 7)
      @fixture.change_status!('home_win')

      assert_equal 602.50, @entry.reload.bank
    end

    it 'changes the outcome of a parlay bet' do
      @odd2 = Odd.import({fixture: @fixture, type: UnderOdd.name, ratio: 1.7, metric: 60})
      @bet = Bet.place_bet({
        user: @user,
        pool_id: @pool.id,
        odd_ids: [@odd.id, @odd2.id],
        amount: 50
      })

      @fixture.update(home_score: 52, away_score: 7)
      @fixture.change_status!('home_win')

      assert_equal 602.50, @entry.reload.bank

      @fixture.change_status!('away_win')
      assert_equal 475.00, @entry.reload.bank
    end
  end
end
