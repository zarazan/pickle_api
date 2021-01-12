class ApplicationController < ActionController::API

  include DeviseTokenAuth::Concerns::SetUserByToken

  before_action :configure_permitted_parameters, if: :devise_controller?

  def fallback_index_html
    render :file => 'public/index.html'
  end

  protected

  def verify_admin
    return if current_user.admin
    raise 'Authentication Error'
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end

end
