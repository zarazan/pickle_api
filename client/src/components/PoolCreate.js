import React, { useState } from 'react';
import history from '../history';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faFireAlt, faHistory, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import PoolType from './PoolType';

const POOL_TYPES = [
    {
        index: 1,
        name: "POPULAR",
        description: "Choose from popular pool types created by the community.",
        icon: faFireAlt,
        disabled: false,
    },
    {
        index: 2,
        name: "RECENT",
        description: "Reuse one of your pool formats and get your game on!",
        icon: faHistory,
        disabled: false,
    },
    {
        index: 3,
        name: "CUSTOM",
        description: "Customize your format for complete control over your pool.",
        icon: faPencilAlt,
        disabled: false,
    },
];

const PoolCreate = props => {
    const [step, setStep] = useState(0); // used for tracking the current step of the create flow
    // POOL CONFIGURATION
    const [poolType, setpoolType] = useState(null);
    const [poolAmount, setPoolAmount] = useState(500);
    const [visibility, setPoolVisibility] = useState('private');
    const [poolStart, setPoolStart] = useState(null);
    const [poolEnd, setPoolEnd] = useState(null);
    const [betTypes, setBetTypes] = useState([]);
    const [sports, setSports] = useState([]);
    const [participants, setParticipants] = useState([]);

    return (
        <PageWrapper>
            <HeaderWrapper>
                {step <= 1 
                    ? 
                    (
                        // Route back to dashboard
                        <button onClick={() => history.push('/')}>
                            <FontAwesomeIcon icon={faArrowLeft} size="2x" />
                        </button>
                    )
                    :
                    (
                        // Increment the step to rerender main
                        <button onClick={() => decrementStep()}>
                            <FontAwesomeIcon icon={faArrowLeft} size="2x" />
                        </button>
                    )
                }
                <Header>CREATE POOL</Header>
            </HeaderWrapper>
            <MainWrapper>
                <h2>Select a Pool Type</h2>
                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                <TypeList>
                    {POOL_TYPES.map((pool) => (
                        <PoolType
                            key={pool.index}
                            index={pool.index}
                            icon={pool.icon}
                            name={pool.name}
                            description={pool.description}
                            disabled={pool.disabled}
                            toggleSelected={setTargetType}
                            isSelected={poolType === pool.index ? true : false}
                        />
                    ))}
                </TypeList>
                <button
                    disabled={poolType === null}
                    onClick={() => incrementStep()}
                    className="form-navigation"
                >
                    NEXT
                </button>
            </MainWrapper>
        </PageWrapper>
    );

    /**
     * incrementStep: Increments the pool configuration step
     */
    function incrementStep() {
        setStep += 1;
    }
    /**
     * decrementStep: Decrements the pool configuration step
     */
    function decrementStep() {
        setStep -= 1;
    }
    /**
     * setTargetType: Sets the selected pool type card.
     */
    function setTargetType(index) {
        setpoolType(index);
    }
    /**
     * setPoolAmount: Sets the starting pool bankroll.
     */
    function setBankroll(amount) {
        setPoolAmount(amount);
    }
    /**
     * toggleVisibility: Toggles the pool between private and public.
     */
    function toggleVisibility() {
        setPoolVisibility(!visibility);
    }
    /**
     * addBet: Adds a bet type to the pool.
     */
    function addBet(bet) {
        // get the existing cache
        let updatedBets = [ ...betTypes ];
        // if bet is not included add it; otherwise do nothing
        if (!updatedBets.includes(bet)) {
            // add the bet
            setBetTypes([ ...betTypes, bet]);
        }
    }
    /**
     * removeBet: Removes a bet type from the pool.
     */
    function removeBet(bet) {
        let indexToRemove;
        let bets;
        // get the existing cache
        let updatedBets = [ ...betTypes ];
        // if bet is included, remove it; otherwise do nothing
        if (updatedBets.includes(bet)) {
            // find the index
            indexToRemove = updatedBets.indexOf(bet);
            if (indexToRemove === 0) { // result was first item; remove it
                bets = updatedBets.slice(1);
            } else {
                updatedBets.splice(indexToRemove, 1);
                bets = updatedBets;
            }
            setBetTypes(bets);
        }
    }

};

PoolCreate.propTypes = {
    
};

export default PoolCreate;

const PageWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 4em auto;
    grid-template-areas:
        "header"
        "main";
    height: 100vh;
`;

const HeaderWrapper = styled.div`
    grid-area: header;
    
    display: grid;
    grid-template-columns: 2em auto 2em;
    grid-template-areas:
        "nav title .";
`;

const Header = styled.h3`
    grid-area: title;
    display: flex;
    justify-content: center;
    align-content: center;
    margin: 0;
`;

const MainWrapper = styled.main`
    display: flex;
    flex-flow: column nowrap;

    & button.form-navigation {
        margin-top: 1em
    }
`;

const TypeList = styled.section`
    grid-area: "main";
    display: flex;
    flex-flow: column nowrap;
`;