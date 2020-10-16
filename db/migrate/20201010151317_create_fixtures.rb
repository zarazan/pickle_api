class CreateFixtures < ActiveRecord::Migration[5.2]

  def change
    create_table :fixtures do |t|
      t.string :sport
      t.datetime :start_time
      t.bigint :home_team_id
      t.bigint :away_team_id
      t.integer :home_score
      t.integer :away_score
      t.string :status
      t.timestamps
    end
  end

end
