class CreateFixtures < ActiveRecord::Migration[5.2]

  def change
    create_table :fixtures do |t|
      t.string :sport
      t.datetime :start_time
      t.string :home_team
      t.string :away_team
      t.integer :home_score
      t.integer :away_score
      t.timestamps
    end
  end

end
