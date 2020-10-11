class CreateFixtures < ActiveRecord::Migration[5.2]

  def change
    create_table :fixtures do |t|
      t.datetime :start_time
      t.string :home
      t.string :away
    end
  end

end
