@now = DateTime.current
@today = @now.beginning_of_day
@end_date = (@now + 7.days).end_of_day

user = User.create!(email: 'zarazan@gmail.com', password: 'pickle1', name: 'Kyle Zarazan')
User.create!(email: 'troy.c.jennings@gmail.com', password: 'pickle2', name: 'Troy Jennings')
User.create!(email: 'knowak14@gmail.com', password: 'pickle3', name: 'Kyle Nowak')
User.create!(email: 'bezektaylor@gmail.com', password: 'pickle4', name: 'Taylor Bezek')

pool = Pool.create_and_enter(
  user: user,
  name: 'Friends & Family Pool',
  start_date: @today,
  end_date: @end_date,
  bankroll: 500,
  bet_types: ['money_line'],
  sports: ['americanfootball_nfl'],
  email_invites: User.the_first_four.pluck(&:email),
  private: true
)
raise "Error creating pool #{pool.errors.join(' ')}" if pool.errors.any?

fixtures_attributes = [
  {
    sport: 'americanfootball_nfl',
    home_team_name: 'Kansas City Chiefs',
    away_team_name: 'Denver Broncos',
    start_time: (@now + 1.day),
    odds: [
      {
        type: 'MoneyLineOdd',
        ratio: '1.5',
        team_name: 'Kansas City Chiefs'
      },
      {
        type: 'MoneyLineOdd',
        ratio: '2.3',
        team_name: 'Denver Broncos'
      },
      {
        type: 'SpreadOdd',
        metric: '-3.5',
        ratio: '1.9',
        team_name: 'Kansas City Chiefs'
      },
      {
        type: 'SpreadOdd',
        metric: '3.5',
        ratio: '1.9',
        team_name: 'Denver Broncos'
      },
      {
        type: 'OverOdd',
        ratio: '1.9',
        metric: '50.5'
      },
      {
        type: 'UnderOdd',
        ratio: '1.9',
        metric: '50.5'
      }
    ]
  },
  {
    sport: 'americanfootball_nfl',
    home_team_name: 'Arizona Cardinals',
    away_team_name: 'Seattle Seahawks',
    start_time: (@now + 2.days),
    odds: [
      {
        type: 'MoneyLineOdd',
        ratio: '1.5',
        team_name: 'Seattle Seahawks'
      },
      {
        type: 'MoneyLineOdd',
        ratio: '2.3',
        team_name: 'Arizona Cardinals'
      },
      {
        type: 'SpreadOdd',
        metric: '-3.5',
        ratio: '1.9',
        team_name: 'Seattle Seahawks'
      },
      {
        type: 'SpreadOdd',
        metric: '3.5',
        ratio: '1.9',
        team_name: 'Arizona Cardinals'
      },
      {
        type: 'OverOdd',
        ratio: '1.9',
        metric: '45'
      },
      {
        type: 'UnderOdd',
        ratio: '1.9',
        metric: '45.5'
      }
    ]
  }
]
LoadOddsService.new.load_fixtures(fixtures_attributes)
