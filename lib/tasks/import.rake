namespace :import do

  desc 'Import NFL Fixtures and Odds'
  task :nfl => [:environment] do
    LoadOddsService.new.populate_sport('americanfootball_nfl')
  end

  desc 'Import NHL Fixtures and Odds'
  task :nhl => [:environment] do
    LoadOddsService.new.populate_sport('icehockey_nhl')
  end

end
