module PickleException

  class UnauthorizedEntry < StandardError
    def message
      'Unauthorized entry to this pool. The email is not on the invite list.'
    end
  end

end
