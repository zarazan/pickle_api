namespace :import do

  desc 'Delete all bets, entries, pools, odds, fixtures, and teams'

  task :clear_fixtures => [:environment] do
    Bet.delete_all
    Entry.delete_all
    Pool.delete_all
    Odd.delete_all
    Fixture.delete_all
    Team.delete_all
  end

  desc 'Import NFL Fixtures and Odds'

  task :nfl => [:environment] do
    User.create_default_users!
    LoadOddsService.new.populate_sport('americanfootball_nfl')
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
