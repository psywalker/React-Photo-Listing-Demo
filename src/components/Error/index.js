import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { URL_FOR_ERROR_IMAGE } from '../../constants';
import './index.scss';

const Error = memo(({ text, smallErrorFlag }) => (
  <div
    data-test="error"
    className={`${smallErrorFlag ? 'error error_small-list' : 'error '}`}
  >
    <div className="error__content">
      <div className="error__content-inner">
        <h3 className="error__title">OOPS</h3>
        <h2 className="error__subtitle">{text}</h2>
        {' '}
        <Link to="/">
          <Button
            style={{ marginLeft: '10px' }}
          >
            BACK TO HOME
          </Button>
        </Link>
      </div>
    </div>
    <img alt={text} src={`${URL_FOR_ERROR_IMAGE}`} className="error__bg" />
  </div>
));

Error.propTypes = {
  text: PropTypes.string,
  smallErrorFlag: PropTypes.bool,
};

Error.defaultProps = {
  text: '',
  smallErrorFlag: false,
};

export default Error;
