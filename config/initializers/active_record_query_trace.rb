if Rails.env.development?
  ActiveRecordQueryTrace.enabled = true
  ActiveRecordQueryTrace.level = :app
  ActiveRecordQueryTrace.lines = 10
end
