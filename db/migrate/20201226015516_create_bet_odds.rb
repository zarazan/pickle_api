class CreateBetOdds < ActiveRecord::Migration[5.2]
  def change
    create_table :bet_odds do |t|
      t.integer :bet_id
      t.integer :odd_id
    end

    add_index :bet_odds, [:bet_id , :odd_id] , :unique => true

    Bet.all.each { |bet| bet.odds << Odd.find(bet.odd_id) }
  end
end
