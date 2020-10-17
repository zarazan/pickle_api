class CreateOdds < ActiveRecord::Migration[5.2]
  
  def change
    create_table :odds do |t|
      t.string :type
      t.bigint :fixture_id
      t.string :odd_type
      t.decimal :ratio
      t.decimal :metric
      t.bigint :team_id
      t.string :player
      t.boolean :active
      t.timestamps
    end
  end

end
