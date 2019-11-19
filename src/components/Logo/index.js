import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { URL_FOR_LOGO } from '../../constants';
import './index.scss';

const Logo = memo(({ setUpdateFlag }) => (
  <div
    data-test="Logo"
    className="logo"
  >
    <Link
      data-test="siteLogoLinkRouter"
      to={{ pathname: '/', state: { flag: true } }}
      onClick={() => setUpdateFlag(true)}
    >
      <img
        className="logo__img"
        src={URL_FOR_LOGO}
        alt="Images-Listing"
      />
    </Link>
  </div>
));

Logo.propTypes = {
  setUpdateFlag: PropTypes.func,
};
Logo.defaultProps = {
  setUpdateFlag: () => {},
};

export default Logo;
