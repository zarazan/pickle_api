import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import PoolTypeList from './PoolTypeList';
import PoolOptionList from './PoolOptionList';
import pickleApi from '../../services/pickle_api';
import VerifyPool from './VerifyPool';

const PoolCreate = props => {
    const [step, setStep] = useState(1); // used for tracking the current step of the create flow
    const [errorMessage, setErrorMessage] = useState('');
    const [poolType, setpoolType] = useState(null);
    const [poolName, setPoolName] = useState(null);
    const [bankroll, setbankroll] = useState(500);
    const [poolStart, setPoolStart] = useState(null);
    const [poolEnd, setPoolEnd] = useState(null);
    const [betTypes, setBetTypes] = useState([]);
    const [sports, setSports] = useState([]);

    let history = useHistory();

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <PoolCreateWrapper className='pool-create'>
            <FormControls className='pool-create__controls'>
                <button className='btn btn__back' onClick={step <= 1 ? () => history.push('/') : () => decrementStep()}>
                    <FontAwesomeIcon icon={faArrowLeft} size="2x" />
                </button>
                <Header>
                {step && step === 'SKIP' ? 'Select a Type'
                : step && step === 1
                    ? 'Select Options'
                    : step && step === 'SKIP'
                        ? 'Invite Participants'
                        : 'Summary'
                }
                </Header>
                {step < 2 
                ? 
                    <button className='btn btn__forward' onClick={() => incrementStep()}>
                        <FontAwesomeIcon icon={faArrowRight} size="2x" />
                    </button>
                : null
                }
            </FormControls>

            <MainWrapper>
                {step && step === 'SKIP'
                    ? (
                        <>
                            <StepTitle className='step'>
                                <span className='step__description'>Select which type of pool you'd like to create.</span>
                            </StepTitle>
                            <PoolTypeList
                                setTargetType={setTargetType}
                                poolType={poolType}
                            />
                        </>)
                    : step && step === 1
                    ? (
                        <>
                            <StepTitle className='step'>
                                <span className='step__description'>Set your pool's options.</span>
                            </StepTitle>
                            <PoolOptionList 
                                setName={setName}
                                startValue={poolStart}
                                endValue={poolEnd}
                                setStart={setStart}
                                setEnd={setEnd}
                                bankroll={bankroll}
                                setBankroll={setBankroll}
                                bets={betTypes}
                                handleCheckChange={handleCheckChange}
                                handleSportChange={handleSportChange}
                            />
                        </>) 
                    : step && step === 'SKIP'
                    ? (
                        <>
                            <StepTitle className='step'>
                                <span className='step__description'>Invite others to participate in your pool.</span>
                            </StepTitle>
                            {
                                /* render user */
                            }
                    </>)
                    : (
                        <>
                             <StepTitle className='step'>
                                <span className='step__description'>Verify your pool settings.</span>
                            </StepTitle>
                            <VerifyPool 
                                name={poolName}
                                bankroll={bankroll}
                                start={poolStart}
                                end={poolEnd}
                                bets={betTypes}
                                sports={sports}
                            />
                            <button
                                disabled={!poolType}
                                onClick={() => createPool()}
                                className='btn pool-create'
                            >
                                <span><FontAwesomeIcon icon={faPlus} size='s' />   Create Pool</span>
                            </button>
                        </>)
                }
            </MainWrapper>

            <FooterWrapper>
            </FooterWrapper>
        </PoolCreateWrapper>
    );

    /** incrementStep: Increments the pool configuration step. **/
    function incrementStep() {
        if (step < 1) {
            setStep(step + 1);
        }
    }
    /** decrementStep: Decrements the pool configuration step. **/
    function decrementStep() {
        if (step > 0) {
            setStep(step - 1);
        }
    }
    /** setTargetType: Sets the selected pool type card. **/
    function setTargetType(index) {
        setpoolType(index);
    }
    /** setName: Sets the pool name. **/
    function setName(name) {
        setPoolName(name);
    }
    /** setbankroll: Sets the starting pool bankroll. **/
    function setBankroll(amount) {
        setbankroll(amount);
    }
    /** setStart: Sets the pool start date. **/
    function setStart(date) {
        setPoolStart(date);
    }
    /** setEnd: Sets the pool end date. **/
    function setEnd(date) {
        setPoolEnd(date);
    }
    /** handleCheckboxChange: Event handler for the checkboxes. **/
    function handleCheckChange(name, obj) {
        let currentBets = [ ...betTypes ];
        let indexToRemove;
        let newBets;
        if (currentBets && currentBets.includes(name)) {
            indexToRemove = currentBets.indexOf(name);
            if (indexToRemove === 0) { // result was first item; remove it
                newBets = currentBets.slice(1);
            } else {
                currentBets.splice(indexToRemove, 1);
                newBets = currentBets;
            }
            setBetTypes(newBets);
        } else {
            setBetTypes([ ...betTypes, name]);
        }
    }
    
    /** handleCheckboxChange: Event handler for the checkboxes. **/
    function handleSportChange(name) {
        let currentSports = [ ...sports ];
        let indexToRemove;
        let newSports;
        if (currentSports && currentSports.includes(name)) {
            indexToRemove = currentSports.indexOf(name);
            if (indexToRemove === 0) { // result was first item; remove it
                newSports = currentSports.slice(1);
            } else {
                currentSports.splice(indexToRemove, 1);
                newSports = currentSports;
            }
            setSports(newSports);
        } else {
            setSports([ ...sports, name]);
        }
    }

    /** createPool: Sends Pickle API request for fetching pools.**/
    function createPool() {
        let resp = {};
        resp.name = poolName;
        resp.start_date = poolStart;
        resp.end_date = poolEnd;
        resp.bankroll = bankroll;
        resp.bet_types = betTypes;
        resp.sports = sports;

        pickleApi.createPool(resp)
            .then(() => {
                history.push('/');
            })
            .catch(error => {
                setErrorMessage(error.toString());
            })
    };
};

export default PoolCreate;

const PoolCreateWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 2.5em auto 3em;
    grid-template-areas:
        "header"
        "main";
    height: 100vh;
    overflow: scroll;
    padding: 1em 1em 1em 1em;
`;

const FormControls = styled.div`
    grid-area: header;
    
    display: grid;
    grid-template-columns: 2em auto 2em;
    grid-template-areas:
        "decr title incr";

    & .btn {
        background: none;
        border: none;
        outline: none;
        color: #202122;

        & :active {
            color: #446eff
        }

        & :selected {
            border: none;
        }

        & :focus {
        }
    }
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

const StepTitle = styled.div`
    display: flex;
    flex-flow: column nowrap;

    align-items: center;
    margin: 1.5em 0 1.5em 0;

    font-family: 'Inter', 'Sans Serif';

    & .step__description {
        font-size: 0.8em;
        color: #7b7ca1;
    }
`;

const MainWrapper = styled.main`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    overflow: auto;

    & .pool-create {
        margin-top: 2em;
        width: 12em;
        height: 3em;
    }
`;

const FooterWrapper = styled.footer`
    display: flex;
    justify-content: center;    
    height: 2em;
`;