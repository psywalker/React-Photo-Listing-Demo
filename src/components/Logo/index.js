import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { URL_FOR_LOGO } from '../../constants';
import './index.scss';

const Logo = memo(({ setIsUpdateApp }) => (
  <div
    data-test="Logo"
    className="logo"
  >
    <Link
      data-test="siteLogoLinkRouter"
      to={{ pathname: '/', state: { flag: true } }}
      onClick={() => setIsUpdateApp(true)}
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
  setIsUpdateApp: PropTypes.func,
};
Logo.defaultProps = {
  setIsUpdateApp: () => {},
};

export default Logo;
