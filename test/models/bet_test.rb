require 'test_helper'

class BetTest < ActiveSupport::TestCase

  describe '.settle' do

    before do
      @pool = Pool.new
      @pool.save!(validate: false)

      @user = User.new
      @user.save!(validate: false)

      @entry = Entry.create(user: user, pool: pool)

      # fixture
      # odd
      # bet
    end

    it 'works' do
      puts @entry.as_json
    end

  end

end
