namespace :import do

  desc 'Thanksgiving NFL Fixtures and Odds Import'

  task :thanksgiving => [:environment] do
    User.create_default_users!
    LoadOddsService.new.populate_sport('americanfootball_nfl')
    Pool.create_and_enter(
      user: User.first,
      name: 'Thanksgiving Test Pool',
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
