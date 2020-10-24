import React, { useState } from 'react';
import history from '../history';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import PoolTypeList from './PoolTypeList';
import PoolOptionList from './PoolOptionList';

const PoolCreate = props => {
    const [step, setStep] = useState(1); // used for tracking the current step of the create flow
    // POOL CONFIGURATION
    const [poolType, setpoolType] = useState(null);
    const [poolName, setPoolName] = useState(null);
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
                <button onClick={step <= 1 ? () => history.push('/') : () => decrementStep()}>
                    <FontAwesomeIcon icon={faArrowLeft} size="2x" />
                </button>
                <Header>CREATE POOL</Header>
            </HeaderWrapper>

            <MainWrapper>
                {step && step === 1
                    ? (
                        <>
                            <StepTitle>
                                <h2>Select a Pool Type</h2>
                                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                            </StepTitle>
                            <PoolTypeList
                                setTargetType={setTargetType}
                                poolType={poolType}
                            />
                        </>)
                    : step && step === 2
                    ? (
                        <>
                            <StepTitle>
                                <h2>Select Pool Options</h2>
                                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                            </StepTitle>
                            <PoolOptionList 
                                setName={setName}
                                visibility={visibility}
                                setVisibility={setVisibility}
                                startValue={poolStart}
                                endValue={poolEnd}
                                setStart={setStart}
                                setEnd={setEnd}
                                poolAmount={poolAmount}
                                setBankroll={setBankroll}
                                bets={betTypes}
                                handleCheckChange={handleCheckChange}
                                handleSportChange={handleSportChange}
                            />
                        </>) 
                    : step && step === 3
                    ? (
                        <>
                            <StepTitle>
                                <h2>Select Pool Participants</h2>
                                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                            </StepTitle>
                            {
                                /* render user */
                            }
                    </>)
                    : (
                        <>
                             <StepTitle>
                                <h2>Pool Summary</h2>
                                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                            </StepTitle>
                            {
                                /* render summary */
                            }
                        </>)
                }
            </MainWrapper>

            <FooterWrapper>
                <button
                    disabled={!poolType}
                    onClick={() => incrementStep()}
                    className="form-navigation"
                >
                    {step === 4 ? 'CREATE POOL' : 'NEXT'}
                </button>
            </FooterWrapper>
        </PageWrapper>
    );

    /**
     * incrementStep: Increments the pool configuration step
     */
    function incrementStep() {
        if (step < 4) {
            setStep(step + 1);
        }
    }
    /**
     * decrementStep: Decrements the pool configuration step
     */
    function decrementStep() {
        if (step > 0) {
            setStep(step - 1);
        }
    }
    /**
     * setTargetType: Sets the selected pool type card.
     */
    function setTargetType(index) {
        setpoolType(index);
    }
    /**
     * setName: Sets the pool name.
     */
    function setName(name) {
        setPoolName(name);
    }
    /**
     * setPoolAmount: Sets the starting pool bankroll.
     */
    function setBankroll(amount) {
        setPoolAmount(amount);
    }
    /**
     * setVisibility: Toggles the pool between private and public.
     */
    function setVisibility(visibility) {
        setPoolVisibility(visibility);
    }
    /**
     * setStart: Sets the pool start date.
     */
    function setStart(date) {
        setPoolStart(date);
    }
    /** setEnd: Sets the pool end date. * */
    function setEnd(date) {
        setPoolEnd(date);
    }

    /** handleCheckboxChange: Event handler for the checkboxes * */
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
    
    /** handleCheckboxChange: Event handler for the checkboxes * */
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
};

PoolCreate.propTypes = {
    
};

export default PoolCreate;

const PageWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 4em auto 3em;
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

const StepTitle = styled.div`


`;

const MainWrapper = styled.main`
    display: flex;
    flex-flow: column nowrap;
`;

const FooterWrapper = styled.footer`
    display: flex;
    justify-content: center;    
    height: 2em;
`;