if Rails.env.development?
  ActiveRecordQueryTrace.enabled = false
  ActiveRecordQueryTrace.level = :app
  ActiveRecordQueryTrace.lines = 5
end
