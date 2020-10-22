class CreateEntries < ActiveRecord::Migration[5.2]

  def change
    create_table :entries do |t|
      t.bigint :pool_id
      t.bigint :user_id
      t.decimal :bank
    end
    add_index :entries, [:pool_id, :user_id], unique: true
  end

end
