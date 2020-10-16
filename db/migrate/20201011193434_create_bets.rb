class CreateBets < ActiveRecord::Migration[5.2]
  
  def change
    create_table :bets do |t|
      t.bigint :odd_id
      t.bigint :user_id
      t.decimal :amount
      t.string :status
      t.timestamps
    end
  end

end
