const MOCK_POOLS = [
    { // date in the past; multi-sport
        'id': 1,
        'name': 'Past Pool',
        'userId': 2,
        'startDate': '2020-01-01T00:00:00.000Z',
        'endDate': '2020-01-08T00:00:00.000Z',
        'bankroll': '500.0',
        'betTypes': ['spread','total_points','money_line'],
        'sports': ['americanfootball_nfl', 'icehockey_nhl'],
        'emailInvites': 6,
        'private': true,
        'userCount': 1
    },
    { // date in the future; single sport
        'id': 1,
        'name': 'Future Pool',
        'userId': 2,
        'startDate': '2021-12-23T00:00:00.000Z',
        'endDate': '2021-12-30T00:00:00.000Z',
        'bankroll': '500.0',
        'betTypes': ['spread','total_points','money_line'],
        'sports': ['americanfootball_nfl'],
        'emailInvites': 6,
        'private': false,
        'userCount': 12
    },
];

export default MOCK_POOLS;