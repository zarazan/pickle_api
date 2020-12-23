import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';

import { ReactComponent as Cancel } from '../../icons/cancel.svg';

function WagerItem(props) {
    return (
        <WagerItemWrapper className='c-wager-item l-grid'>
            <div className='l-grid__item'>
                <p className='c-wager-item__team-name-metric'>{`${props.teamName}  ${props.metric}`}</p>
                <p className='c-wager-item__bet-type'>{`${props.betType} @ ${props.ratio}`}</p>
                <p className='c-wager-item__game-name'>{props.gameName}</p>
            </div>
            {/* <div className='l-grid__item l-row-flex'>
                <p className='c-wager-item__ratio'>{props.ratio}</p>
            </div> */}
            <div className='l-grid__item'>
                <button className='btn c-wager-item__delete'>
                    <Cancel />
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
    gameName: 'Test!',
}

export default WagerItem

const WagerItemWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 50px;

    padding: 12px 6px;

    &:not(:last-of-type) {
        border-bottom: 1px solid #F2F2F2;
    }

    & div.l-grid {
        display: grid;
    }

    & p {
        font-family: 'Inter', sans-serif;
        font-size: 13px;
        margin: 0;
        color: #404040;
    }

    & .btn[class~='c-wager-item__delete'] {
        height: 100%;
        width: 100%;
        border: none;
        background: none;
        outline: none;

        & svg {
            height: 16px;
            width: 16px;
            fill: #C5C5C5;
        }
    }
`;