import React, { useEffect, useReducer } from 'react';
import pickleApi from '../../services/pickle_api';

const EditScores = props => {

    function fixturesReducer(fixtures, action) {
        switch(action.type) {
            case 'update':
                return fixtures.map((fixture) => {
                    if(fixture.id === action.id) {
                        return { ...fixture, [action.attribute]: action.value };
                    } else {
                        return fixture;
                    }
                });
            case 'load':
                return action.fixtures
            default:
                throw new Error();
        }
    };

    const [fixtures, dispatch] = useReducer(fixturesReducer, []);

    useEffect(() => {
        pickleApi.getAdminFixtures(1)
            .then(fixtures => dispatch({type: 'load', fixtures: fixtures}))
            .catch(error => console.log(error))
    }, []);

    function handleSubmit(event) {
        event.preventDefault();
        console.log(fixtures);
    }

    return (
        <form onSubmit={handleSubmit}>
            <table>
                <thead>
                    {renderTableHeader()}
                </thead>
                <tbody>
                    {renderFixtures()}
                </tbody>
            </table>
            <input type="submit" value="Submit"/>
        </form>
    )

    function renderTableHeader() {
        return (
            <tr>
                <th>Start Time</th>
                <th>Sport</th>
                <th>Home Team</th>
                <th>Home Score</th>
                <th>Away Team</th>
                <th>Away Score</th>
            </tr>
        )
    }

    function renderFixtures() {
        return fixtures.map((fixture) => renderFixture(fixture));
    }

    function renderFixture(fixture) {
        return (
            <tr key={fixture.id}>
                <td>{fixture.startTime}</td>
                <td>{fixture.sport}</td>
                <td>{fixture.homeTeamName}</td>
                <td><input 
                        type='text'
                        value={fixture.homeScore || ''}
                        onChange={event => dispatch({
                            type: 'update',
                            id: fixture.id,
                            attribute: 'homeScore',
                            value: event.target.value
                        })}
                /></td>
                <td>{fixture.awayTeamName}</td>
                <td>{fixture.awayScore}</td>
            </tr>
        )
    }

}

export default EditScores;
