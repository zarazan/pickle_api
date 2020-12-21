@now = DateTime.current
@today = @now.beginning_of_day
@end_date = (@now + 7.days).end_of_day

User.create_default_users!

user = User.first
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
  },
  {
    sport: 'americanfootball_nfl',
    home_team_name: 'Seattle Seakhawks',
    away_team_name: 'Washington Football Team',
    start_time: (@now + 3.days),
    odds: [
      {
        type: 'MoneyLineOdd',
        ratio: '1.5',
        team_name: 'Seattle Seahawks'
      },
      {
        type: 'MoneyLineOdd',
        ratio: '2.3',
        team_name: 'Washington Football Team'
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
        team_name: 'Washington Football Team'
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
  },
  {
    sport: 'americanfootball_nfl',
    home_team_name: 'New York Giants',
    away_team_name: 'New England Patriots',
    start_time: '2020-12-24T00:18:18.032Z',
    odds: [
      {
        type: 'MoneyLineOdd',
        ratio: '1.5',
        team_name: 'New York Giants'
      },
      {
        type: 'MoneyLineOdd',
        ratio: '2.3',
        team_name: 'New England Patriots'
      },
      {
        type: 'SpreadOdd',
        metric: '-3.5',
        ratio: '1.9',
        team_name: 'New York Giants'
      },
      {
        type: 'SpreadOdd',
        metric: '3.5',
        ratio: '1.9',
        team_name: 'New England Patriots'
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
  },
  {
    sport: 'americanfootball_nfl',
    home_team_name: 'New York Jets',
    away_team_name: 'Houston Texans',
    start_time: '2020-12-24T00:30:18.032Z',
    odds: [
      {
        type: 'MoneyLineOdd',
        ratio: '1.5',
        team_name: 'New York Jets'
      },
      {
        type: 'MoneyLineOdd',
        ratio: '2.3',
        team_name: 'Houston Texans'
      },
      {
        type: 'SpreadOdd',
        metric: '-3.5',
        ratio: '1.9',
        team_name: 'New York Jets'
      },
      {
        type: 'SpreadOdd',
        metric: '3.5',
        ratio: '1.9',
        team_name: 'Houston Texans'
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
