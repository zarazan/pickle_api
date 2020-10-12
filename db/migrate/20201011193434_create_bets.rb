class CreateBets < ActiveRecord::Migration[5.2]
  
  def change
    create_table :bets do |t|
      t.integer :odd_id
      t.decimal :amount
      t.timestamps
    end
  end

end
