class CreateTeams < ActiveRecord::Migration[5.2]

  def change
    create_table :teams do |t|
      t.string :name
      t.string :sport
    end
    add_index :teams, [:name, :sport], unique: true
  end

end
