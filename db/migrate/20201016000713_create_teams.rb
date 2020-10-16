class CreateTeams < ActiveRecord::Migration[5.2]

  def change
    create_table :teams do |t|
      t.string :name
      t.string :the_odds_api_key
    end
  end

end
