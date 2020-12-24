import React, { useState, useEffect, useReducer, useContext } from 'react';
import { useParams } from 'react-router-dom';
import pickleApi from '../../services/pickle_api';
import { UserContext } from '../../contexts/UserContext';
import useAuthHandler from '../../hooks/AuthHandler';

const EditScores = props => {

    let { poolId } = useParams();
    const [{user}] = useContext(UserContext);
    const [buttonText, setButtonText] = useState('Loading...');

    const [fixtures, dispatch] = useReducer((fixtures, action) => {
        switch(action.type) {
            case 'update':
                return fixtures.map(fixture => {
                    if(fixture.id === action.id) {
                        return { ...fixture, [action.attribute]: action.value };
                    } else {
                        return fixture;
                    }
                });
            case 'load':
                return action.fixtures;
            default:
                throw new Error();
        }
    }, []);

    useEffect(() => {
        pickleApi.getAdminFixtures(poolId)
            .then(handleResponse)
            .catch(console.log)
    }, []);

    function handleResponse(fixtures) {
        dispatch({type: 'load', fixtures: fixtures});
        setButtonText('Submit');
    }

    function handleSubmit(event) {
        event.preventDefault();
        setButtonText('Saving...');
        dispatch({type: 'load', fixtures: []});
        pickleApi.saveAdminFixtures(fixtures)
            .then(handleResponse)
            .catch(console.log)
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
            <input type="submit" value={buttonText} disabled={buttonText !== 'Submit'}/>
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
                <th>Status</th>
            </tr>
        )
    }

    function renderFixtures() {
        return fixtures.map(fixture => renderFixture(fixture));
    }

    function renderFixtureInput(fixture, attribute) {
        return (
            <input 
                type='text'
                value={fixture[attribute] || ''}
                onChange={event => dispatch({
                    type: 'update',
                    id: fixture.id,
                    attribute: attribute,
                    value: event.target.value
                })}
            />
        )
    }

    function renderStatusSelect(fixture) {
        return (
            <select 
                value={fixture.status} 
                onChange={event => dispatch({
                    type: 'update',
                    id: fixture.id,
                    attribute: 'status',
                    value: event.target.value
                })}>
                <option value="scheduled">Scheduled</option>
                <option value="in_progress">In Progress</option>
                <option value="home_win">Home Win</option>
                <option value="away_win">Away Win</option>
                <option value="draw">Draw</option>
            </select>
        )
    }

    function renderFixture(fixture) {
        return (
            <tr key={fixture.id}>
                <td>{fixture.startTime}</td>
                <td>{fixture.sport}</td>
                <td>{fixture.homeTeamName}</td>
                <td>{renderFixtureInput(fixture, 'homeScore')}</td>
                <td>{fixture.awayTeamName}</td>
                <td>{renderFixtureInput(fixture, 'awayScore')}</td>
                <td>{renderStatusSelect(fixture)}</td>
            </tr>
        )
    }

}

export default EditScores;
