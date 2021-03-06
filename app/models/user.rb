class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  has_many :rfis, -> { order 'id asc' }
  has_many :collaborators
  has_many :responses
  validates :name, presence: true
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :invitable

  def pending_invitation
    return invitation_created_at != nil && invitation_accepted_at == nil
  end
end
