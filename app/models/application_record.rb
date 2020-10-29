class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def as_json(options = {})
    hash = {}
    attributes.each { |name, value| hash[name.camelize(:lower)] = value }
    hash
  end

end
