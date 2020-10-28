import React from 'react';
import styled from 'styled-components';
import RowResult from './RowResult';
import WinnerCard from './WinnerCard';
import DEFAULT_LEADERBOARD_RESULTS from '../../constants/leaderboardDefaultResults';

const Leaderboard = props => {
    return (
        <LeaderboardWrapper className='leaderboard-container'>
            <Header className='leaderboard__header subsection'>Leaderboard</Header>
            <WinnerCircle className='leaderboard__leader subsection'>
                {DEFAULT_LEADERBOARD_RESULTS.slice(0, 3).map((result, index) => (
                    <WinnerCard 
                        key={index}
                        rank={index + 1}
                        avatar={result.image}
                        name={result.name}
                        bankroll={result.bankroll}
                    />
                ))}
            </WinnerCircle>
            <div className='leaderboard__places subsection'>
                {DEFAULT_LEADERBOARD_RESULTS.map((result, index) => (
                    <RowResult 
                        key={index}
                        rank={index}
                        avatar={result.image}
                        name={result.name}
                        bankroll={result.bankroll}
                    />
                ))}
            </div>
        </LeaderboardWrapper>
    );
};

export default Leaderboard;

const LeaderboardWrapper = styled.section`
    display: flex;
    flex-flow: column nowrap;

    box-sizing: border-box;
    height: auto;
    overflow: auto;
`;

const Header = styled.h2`
    grid-area: title;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    
    font-family: 'Poppins', 'Sans Serif';
    font-size: 1.25em;
    font-weight: 900;
    color: #202122;

    margin: 0;
`;

const WinnerCircle = styled.div`
    display: grid;
    grid-template-columns: 30% 1fr 30%;
    grid-template-areas:
        'second first third';
        box-sizing: border-box;
    margin: 1.5em 0 3em 0;

    .trophy {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
    }

    .winner-card-1 {
        grid-area: first;
    }

    .winner-card-2 {
        grid-area: second;
    }

    .winner-card-3 {
        grid-area: third;
    }
`;