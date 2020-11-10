import React, { useEffect, useState } from 'react';
import pickleApi from '../../services/pickle_api';

const EditScores = props => {

    const [fixtures, setFixtures] = useState([])

    useEffect(() => {
        pickleApi.getAdminFixtures(1)
            .then((fixtures) => setFixtures(fixtures))
            .catch((error) => console.log(error))
    }, []);

    return (
        <table>
            {renderTableHeader()}
            {renderFixtures()}
        </table>
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
            <tr>
                <td>{fixture.startTime}</td>
                <td>{fixture.sport}</td>
                <td>{fixture.homeTeamName}</td>
                <td>{fixture.homeScore}</td>
                <td>{fixture.awayTeamName}</td>
                <td>{fixture.awayScore}</td>
            </tr>
        )
    }

}

export default EditScores;
