namespace :import do

  desc 'Create founder users'
  task :founders => [:environment] do
    User.create_default_users!
  end

  desc 'Import NFL Fixtures and Odds'
  task :nfl => [:environment] do
    LoadOddsService.new.populate_sport('americanfootball_nfl')
  end

  desc 'Create alpha test pool'
  task :alpha_pool => [:environment] do
    Pool.create_and_enter(
      user: User.first,
      name: 'NFL Test Pool',
      start_date: DateTime.current.beginning_of_day,
      end_date: (DateTime.current.end_of_day + 5.days),
      bankroll: 500,
      bet_types: ['money_line', 'total_points', 'spread'],
      sports: ['americanfootball_nfl'],
      email_invites: User.the_first_four.pluck(&:email),
      private: true
    )
  end

end
