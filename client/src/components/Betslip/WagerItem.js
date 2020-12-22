import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';

function WagerItem(props) {
    return (
        <WagerItemWrapper className='c-wager-item l-grid'>
            <div className='l-grid__item'>
                <p className='c-wager-item__team-name-metric'>{`${props.teamName}  ${props.metric}`}</p>
                <p className='c-wager-item__bet-type'>{props.betType}</p>
                <p className='c-wager-item__game-name'>{props.gameName}</p>
            </div>
            <div className='l-grid__item'>
                <p className='c-wager-item__ratio'>{props.ratio}</p>
            </div>
            <div className='l-grid__item'>
                <button className='btn c-wager-item__delete'>
                    X
                </button>
            </div>
        </WagerItemWrapper>
    )
}

WagerItem.propTypes = {
    props: PropTypes.objectOf({
        gameName: PropTypes.string,
        teamName: PropTypes.string.isRequired,
        betType: PropTypes.string.isRequired,
        metric: PropTypes.string.isRequired,
        ratio: PropTypes.string.isRequired,
    }),
}

WagerItem.defaultProps = {
    props: {
        gameName: 'Test!',
    } 
}

export default WagerItem

const WagerItemWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 100px 50px;

    border: 1px solid lightgrey;

    & p {
        font-family: 'Inter', sans-serif;
        font-size: 13px;
        margin: 0;
        color: #404040;

        &.wager-item__ratio { text-align: center; }
    }

    & .btn {
        height: 100%;
    }
`;