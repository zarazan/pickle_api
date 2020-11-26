namespace :import do

  desc 'Thanksgiving NFL Fixtures and Odds Import'
  task :thanksgiving => [:environment] do
    User.create_default_users!
    LoadOddsService.new.populate_sport('americanfootball_nfl')
  end

end
