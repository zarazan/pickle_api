class User < ApplicationRecord

  extend Devise::Models
  include DeviseTokenAuth::Concerns::User

  devise :database_authenticatable,
         :recoverable, :rememberable, :trackable

  before_save -> { skip_confirmation! }

  has_many :bets
  has_many :entries
  has_many :pools

  def self.the_first_four
    User.where(id: [1, 2, 3, 4])
  end

end
