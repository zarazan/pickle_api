@now = DateTime.current
@start_date = @now.beginning_of_day
@end_date = (@now + 7.days).end_of_day

user = User.create!(email: 'zarazan@gmail.com', password: 'pickle1', name: 'Kyle Zarazan')
User.create!(email: 'troy.c.jennings@gmail.com', password: 'pickle2', name: 'Troy Jennings')
User.create!(email: 'knowak14@gmail.com', password: 'pickle3', name: 'Kyle Nowak')
User.create!(email: 'bezektaylor@gmail.com', password: 'pickle4', name: 'Taylor Bezek')

pool = Pool.create_and_enter(
  user: user,
  name: 'Friends & Family Pool',
  start_date: @start_date,
  end_date: @end_date,
  bankroll: 500,
  bet_types: ['money_line'],
  sports: ['americanfootball_nfl'],
  email_invites: User.the_first_four.pluck(&:email),
  private: true
)
raise "Error creating pool #{pool.errors.join(' ')}" if pool.errors.any?
