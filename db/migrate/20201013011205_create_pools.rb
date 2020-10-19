class CreatePools < ActiveRecord::Migration[5.2]

  def change
    create_table :pools do |t|
      t.string :name
      t.bigint :user_id
      t.datetime :start_date
      t.datetime :end_date
      t.decimal :bankroll
      t.jsonb :bet_types
      t.jsonb :sports
      t.jsonb :email_invites
      t.boolean :private
    end
  end

end
