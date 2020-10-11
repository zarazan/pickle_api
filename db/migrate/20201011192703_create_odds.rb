class CreateOdds < ActiveRecord::Migration[5.2]
  
  def change
    create_table :odds do |t|
      t.integer :fixture_id
      t.string :type
    end
  end

end
