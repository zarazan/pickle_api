# This file is used by Rack-based servers to start the application.

require_relative 'config/environment'

use Rack::Static, :urls => {"/" => 'index.html'}, :root => 'client/build'

run Rails.application
