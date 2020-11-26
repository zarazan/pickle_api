require 'test_helper'

class PoolTest < ActiveSupport::TestCase

  describe 'validations' do

    before do
      user = User.new(email: 'asdf@asdf.com', password: 'password')
      now = DateTime.now
      @pool = Pool.new(
        user: user,
        name: 'Family Pool',
        start_date: now,
        end_date: now + 1.day,
        bankroll: '500',
        bet_types: ['money_line'],
        sports: ['baseball_mlb']
      )
    end

    it 'saves a valid pool' do
      assert @pool.save, @pool.errors.to_json
    end

    it 'requires name' do
      @pool.name = nil
      refute @pool.save
      assert @pool.errors['name'].any?
    end

    it 'requires bankroll' do
      @pool.bankroll = nil
      refute @pool.save
      assert @pool.errors['bankroll'].any?
    end

    it 'requires a bet type' do
      @pool.bet_types = nil
      refute @pool.save
      assert @pool.errors['bet_types'].any?
    end

    it 'blocks invalid bet types' do
      @pool.bet_types = ['invalid_bet_type']
      refute @pool.save
      assert @pool.errors['bet_types'].any?
    end

    it 'requires a sport' do
      @pool.sports = nil
      refute @pool.save
      assert @pool.errors['sports'].any?
    end

    it 'blocks invalid sports' do
      @pool.sports = ['invalid_sport']
      refute @pool.save
      assert @pool.errors['sports'].any?
    end

  end

end
