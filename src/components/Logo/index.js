import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { URL_FOR_LOGO } from '../../constants';
import './index.scss';

const Logo = memo(() => (
  <div
    data-test="Logo"
    className="logo"
  >
    <Link
      data-test="siteLogoLinkRouter"
      to={{ pathname: '/', state: { flag: true } }}
    >
      <img
        className="logo__img"
        src={URL_FOR_LOGO}
        alt="Logo"
      />
    </Link>
  </div>
));

export default Logo;
