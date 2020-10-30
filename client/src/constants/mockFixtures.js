const MOCK_FIXTURES = [
    {
        "id": 1,
        "sport": "americanfootball_nfl",
        "start_time": "2020-10-28T22:01:02.337Z",
        "home_team_id": 1,
        "away_team_id": 2,
        "home_score": null,
        "away_score": null,
        "status": "scheduled",
        "created_at": "2020-10-27T22:01:03.162Z",
        "updated_at": "2020-10-27T22:01:03.162Z",
        "odds": [
            {
                "id": 1,
                "fixture_id": 1,
                "ratio": "1.5",
                "metric": null,
                "team_id": 1,
                "player": null,
                "active": true,
                "created_at": "2020-10-27T22:01:03.183Z",
                "updated_at": "2020-10-27T22:01:03.183Z"
            },
            {
                "id": 2,
                "fixture_id": 1,
                "ratio": "2.3",
                "metric": null,
                "team_id": 2,
                "player": null,
                "active": true,
                "created_at": "2020-10-27T22:01:03.188Z",
                "updated_at": "2020-10-27T22:01:03.188Z"
            }
        ]
    },
    {
        "id": 2,
        "sport": "americanfootball_nfl",
        "start_time": "2020-10-29T22:01:02.337Z",
        "home_team_id": 3,
        "away_team_id": 4,
        "home_score": null,
        "away_score": null,
        "status": "scheduled",
        "created_at": "2020-10-27T22:01:03.197Z",
        "updated_at": "2020-10-27T22:01:03.197Z",
        "odds": [
            {
                "id": 3,
                "fixture_id": 2,
                "ratio": "1.9",
                "metric": "-3.5",
                "team_id": 4,
                "player": null,
                "active": true,
                "created_at": "2020-10-27T22:01:03.207Z",
                "updated_at": "2020-10-27T22:01:03.207Z"
            },
            {
                "id": 4,
                "fixture_id": 2,
                "ratio": "1.9",
                "metric": "3.5",
                "team_id": 3,
                "player": null,
                "active": true,
                "created_at": "2020-10-27T22:01:03.211Z",
                "updated_at": "2020-10-27T22:01:03.211Z"
            }
        ]
    }
];

export default MOCK_FIXTURES;