import React from 'react';
import styled from 'styled-components';
import RowResult from './RowResult';
import WinnerCard from './WinnerCard';
import MOCK_ENTRIES from '../../constants/mockEntries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


const Leaderboard = ({ toggleDisplay, props }) => {
    return (
        <LeaderboardWrapper className='leaderboard-container'>
            <Header>
                <button className='leaderboard__back-nav' onClick={() => toggleDisplay('dashboard')}><FontAwesomeIcon icon={faArrowLeft} size='1x' /></button>
                <Title className='leaderboard__title subsection'>LEADERBOARD</Title>
            </Header>
            <WinnerCircle className='leaderboard__leader subsection'>
                {MOCK_ENTRIES.slice(0, 3).map((result, index) => (
                    <WinnerCard 
                        key={index}
                        rank={index + 1}
                        avatar={result.image}
                        name={result.name}
                        bankroll={result.bankroll}
                    />
                ))}
            </WinnerCircle>
            <PlacesList className='leaderboard__places subsection'>
                {MOCK_ENTRIES.map((result, index) => (
                    <RowResult 
                        key={index}
                        rank={index}
                        avatar={result.image}
                        name={result.name}
                        bankroll={result.bankroll}
                    />
                ))}
            </PlacesList>
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

const Header = styled.header`
    display: grid;
    grid-template-columns: 10% 1fr 10%;
    grid-template-areas:
        'left title right';
    height: 1.75rem;

    & button.leaderboard__back-nav {
        grid-area: left;
        background: none;
        border: none;
        outline: none;
    }
`;

const Title = styled.h3`
    grid-area: title;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    
    margin: 0;

    font-family: 'Poppins', 'Sans Serif';
    font-size: .8125rem;
    letter-spacing: .0625em;
    color: #8b8c8f;
`;

const WinnerCircle = styled.div`
    display: grid;
    grid-template-columns: 30% 1fr 30%;
    grid-template-areas:
        'second first third';
    box-sizing: border-box;
    margin: 1em 0 1em 0;

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

const PlacesList = styled.div`
    display: flex;
    flex-flow: column nowrap;
    box-sizing: border-box;
    padding: 0 0.1rem 0.75rem 0.1rem;
`;