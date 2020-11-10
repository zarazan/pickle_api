import React, { useState, useEffect, useContext } from 'react';
import useAuthHandler from '../../hooks/AuthHandler';
import { UserContext } from '../../contexts/UserContext';
import styled from'styled-components';
import Leaderboard from './Leaderboard';
import GameOdds from '../betslip/GameOdds';
import OpenBets from './OpenBets';
import { useParams } from 'react-router-dom';
import pickleApi from '../../services/pickle_api';
import PoolUserCard from './PoolUserCard';
import RowResult from './RowResult';
import OpenBetCard from './OpenBetCard';

import MOCK_BETS from '../../constants/mockBets';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

const ViewPool = () => {
    const [user, setUser] = useContext(UserContext);
    const isLoadingUser = useAuthHandler(user, setUser);
    let { poolId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [display, setDisplay] = useState('dashboard');
    const [entries, setEntries] = useState([]);
    const [fixtures, setFixtures] = useState([]);
    const [bets, setBets] = useState(null);
    const [myInfo, setMyInfo] = useState({});

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    useEffect(() => {
        setIsLoading(true);
        pickleApi.getEntries(poolId)
            .then(entries => {
                setEntries(entries);
                setMyInfo(entries.filter(entry => entry.userName === 'Kyle Zarazan').pop());
                pickleApi.getFixtures(poolId)
                .then(fixtures => {
                    setFixtures(fixtures);
                    pickleApi.getBets(poolId)
                        .then(bets => {
                            setBets(bets);
                            setIsLoading(false);
                        })
                        .catch(error => {
                            setErrorMessage(error.toString());
                        })
                })
                .catch(error => {
                    setErrorMessage(error.toString());
                })
            })
            .catch(error => {
                setErrorMessage(error.toString());
            })
      }, []);

    //   useEffect(() => {
    //     pickleApi.getBets(poolId)
    //     .then(bets => {
    //         setBets(bets);
    //         setIsLoading(false);
    //     })
    //     .catch(error => {
    //         setErrorMessage(error.toString());
    //     })
    //   }, [bets]);

    return (
        <ViewPoolWrapper className='pool-view-container'>
            {/* <ViewToggle className='view-toggle'>
                <div className={`toggle-container${display && display === 'leaderboard' ? '-selected' : ''}`}>
                    <ClickableToggle className='btn btn-toggle' name='leaderboard' onClick={e => toggleDisplay(e.target.name)}>
                        Leaderboard
                    </ClickableToggle>
                </div>

                <div className={`toggle-container${display && display === 'games' ? '-selected' : ''}`}>
                <ClickableToggle className='btn btn-toggle' name='games' onClick={e => toggleDisplay(e.target.name)}>
                    Games
                </ClickableToggle>
                </div>

                <div className={`toggle-container${display && display === 'open-bets' ? '-selected' : ''}`}>
                <ClickableToggle className='btn btn-toggle' name='open-bets' onClick={e => toggleDisplay(e.target.name)}>
                    Open Bets
                </ClickableToggle>
                </div>
            </ViewToggle> */}

            {errorMessage && <div>{errorMessage}</div>}

            {isLoading ? (
                <div>
                    Loading Pool...
                </div>
            ) : (
                <>
                    {display && display === 'dashboard'
                    ?
                        <PoolContent className='pool-content'>
                            <div className='pool-content__title'>
                                <h2>{'Pool Name'}</h2>
                            </div>
                            <div className='pool-content__user-stats'>
                                <PoolUserCard name={myInfo.userName} avatar={null} bankroll={myInfo.bankrollPlusActiveBets}/>
                            </div>
                            <div className='pool-content__leaderboard-container'>
                                <div className='leaderboard-header'>
                                    <h3>{'LEADERBOARD'}</h3>
                                    <button onClick={() => toggleDisplay('leaderboard')}><FontAwesomeIcon icon={faArrowRight} size='sm' /></button>
                                </div>
                                <div className='pool-content__leaderboard-list'>
                                    <RowResult 
                                        rank={0}
                                        avatar={null}
                                        name={'Troy Jennings'}
                                        bankroll={'500'}
                                    />
                                    <RowResult 
                                        rank={1}
                                        avatar={null}
                                        name={'Taylor Bezek'}
                                        bankroll={'500'}
                                    />
                                    <RowResult 
                                        rank={2}
                                        avatar={null}
                                        name={'Kyle Nowak'}
                                        bankroll={'500'}
                                    />
                                </div>
                            </div>
                            <div className='pool-content__separator'>
                                <span><FontAwesomeIcon icon={faEllipsisH} size='1x' color={'#e5e5e6'}/></span>
                            </div>
                            <div>
                                <div className='pool-user-placement'>
                                    <RowResult 
                                        rank={3}
                                        avatar={null}
                                        name={'Kyle Zarazan'}
                                        bankroll={'500'}
                                        style={{ backgroundColor: 'blue' }}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className='schedule-header'>
                                    <h3>{'SCHEDULE & BETS'}</h3>
                                </div>
                                <div className='pool-fixture-schedule'>
                                    <div className='btn schedule-btn'><button onClick={() => toggleDisplay('games')}>View Full Schedule</button></div>
                                </div>
                            </div>
                            <div>
                                <div className='open-bets-header'>
                                    <h3>{'OPEN BETS'}</h3>
                                </div>
                                <BetSlipWrapper className='betslip-container'>
                                    {(bets || MOCK_BETS).map((bet, i) => (
                                        <OpenBetCard key={i} gameName={null} bet={bet} />
                                    ))}
                                </BetSlipWrapper>
                            </div>
                        </PoolContent>

                    : display == 'leaderboard'
                        ? <Leaderboard toggleDisplay={toggleDisplay} leaderboard={entries}/>
                        : display === 'games'
                            ? <GameOdds toggleDisplay={toggleDisplay} poolId={poolId} fixtures={fixtures}/>
                            : <OpenBets bets={bets}/>
                    }   
                </>
                // <>
                //     <UserData className='user-data'>
                //         <div className=''>
                //             <h2 className=''>Bankroll</h2>
                //             <span className=''>$500</span>
                //         </div>
                //         <div className=''>
                //             <h2 className=''>To Win</h2>
                //             <span className=''>$0</span>
                //         </div>
                //     </UserData>
                // </>
            )}
        </ViewPoolWrapper>
    );

    /** toggleDisplay: Toggles the view to be displayed. **/
    function toggleDisplay(value) {
        const currentDisplay = display;
        if (currentDisplay !== value) {
            setDisplay(value);
        }
    }
};

export default ViewPool;

const ViewPoolWrapper = styled.div`
    box-sizing: border-box;
    height: 100%;
`;

const PoolContent = styled.section`
    display: flex;
    flex-flow: column nowrap;

    font-family: 'Inter', 'Sans Serif';

    & h2 {
        font-size: 1.25rem;
    }

    & h3 {
        margin: 0;
        font-size: .8125rem;
        letter-spacing: .0625em;
        color: #8b8c8f;
    }

    & h2, h3 {
        font-family: 'Poppins', 'Sans Serif';
    }

    & .pool-content__separator {
        display: flex;
        justify-content: center;
        margin: 0.5rem 0 0.5rem;
    }

    & .pool-content__title {
        display: flex;
        justify-content: center;

        & > h2 {
            margin: 0 0 0.5em;
        }
    }

    & .schedule-btn {
        &:hover {
            & button {
                border-color: #8fd6a9;
                font-weight: 500;
            }
        }

        & button {
            box-sizing: border-box;
            padding: 1rem 0 1rem;
            width: 100%;
            background: none;
            border: 1px solid #8b8c8f;
            border-radius: 0.2rem;
            outline: none;
            font-family: 'Inter', 'Sans Serif';
            font-size: .8125rem;
            color: #8fd6a9;
        }
    }

    & .leaderboard-header, .schedule-header, .open-bets-header {
        display: flex;
        justify-content: space-between;
        align-content: center;
        margin: 1.25rem 0 1.25rem;
        
        & > button {
            background: white;
            border: none;
            outline: none;
            height: auto;
        }
    }
`;

const BetSlipWrapper = styled.div`
    box-sizing: border-box;
    padding-bottom: 1rem;
`;

// const ViewToggle = styled.section`
//     display: grid;
//     grid-gap: 0em;
//     grid-template-columns: 1fr 1fr 1fr;
//     margin-bottom: 1.5em;

//     & div[class^='toggle-container'] {
//         border: 2px solid #eaf3fd;
//         background-color: #eaf3fd;

//         &:first-of-type {
//             border-radius: 0.5em 0 0 0.5em;;
//         }

//         &:last-of-type {
//             border-radius: 0 0.5em 0.5em 0;;
//         }
//     }

//     & .toggle-container-selected > .btn {
//         border: 2px solid #eaf3fd;
//         background-color: #2e8dfe;
//         color: white;
//     }
// `;

// const ClickableToggle = styled.button`
//     box-sizing: border-box;
//     height: 3em;
//     width: 100%;

//     font-family: 'Poppins', 'Sans Serif';
//     font-size: 0.8em;

//     border: none;
//     border-radius: 0.5em;
//     outline: none;
//     background-color: #eaf3fd;
//     color: #5698d6;
// `;

// const UserData = styled.section`
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     box-sizing: border-box;
//     margin-bottom: 1.5em;

//     font-family: 'Poppins', 'Sans Serif';

//     & > div {
//         display: flex;
//         flex-flow: column nowrap;
//         align-items: center;

//         & h2 {
//             margin: 0 0 0.3em 0;
//             font-size: 1.25em;
//         }
//     }
// `;