import React from 'react';
import PropTypes from 'prop-types';
import { RotateSpinner } from 'react-spinners-kit';

const FullPageSpinner = ({ size, loading, optionalMessage }) => {
  return (
    <div
      className='page-spinner'
      style={{
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80%',
      }}
    >
      <RotateSpinner
        className='page-spinner__spinner'
        size={size}
        loading={loading}
        color={'#5dc382'}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '0.7rem',
        }}
      >
        <h4
          className='page-spinner__message'
          style={{
            margin: '0',
            fontFamily: 'Poppins',
            fontSize: '1rem',
            color: '#1a1a1a',
          }}
        >
          {optionalMessage}
        </h4>
      </div>
    </div>
  );
};

FullPageSpinner.propTypes = {
  loading: PropTypes.bool.isRequired,
  optionalMessage: PropTypes.string,
};

FullPageSpinner.defaultProps = {
  loading: true,
  optionalMessage: '',
  size: 30,
};

export default FullPageSpinner;