class User < ApplicationRecord

  extend Devise::Models
  include DeviseTokenAuth::Concerns::User

  devise :database_authenticatable,
         :recoverable, :rememberable, :trackable

  before_save -> { skip_confirmation! }

  validates :name, presence: true

  has_many :bets
  has_many :entries
  has_many :pools

  def self.the_first_four
    User.where(id: [1, 2, 3, 4])
  end

  def self.create_default_users!
    User.create!(email: 'zarazan@gmail.com', password: 'pickle1', name: 'Kyle Zarazan')
    User.create!(email: 'troy.c.jennings@gmail.com', password: 'pickle2', name: 'Troy Jennings')
    User.create!(email: 'knowak14@gmail.com', password: 'pickle3', name: 'Kyle Nowak')
    User.create!(email: 'bezektaylor@gmail.com', password: 'pickle4', name: 'Taylor Bezek')
  end

end
