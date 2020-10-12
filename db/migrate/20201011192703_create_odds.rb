class CreateOdds < ActiveRecord::Migration[5.2]
  
  def change
    create_table :odds do |t|
      t.integer :fixture_id
      t.string :odd_type
      t.decimal :ratio
      t.decimal :metric
      t.string :team
      t.string :player
      t.boolean :active
      t.timestamps
    end
  end

end
