class AddAdminToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :admin, :boolean
    User.where(id: 1..4).update_all(admin: true)
  end
end
