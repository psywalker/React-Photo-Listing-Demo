import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updatedApp } from '../../actions';
import { URL_FOR_LOGO } from '../../constants';
import './index.scss';

const Logo = memo(() => {
  const dispatch = useDispatch();
  const updateApp = () => {
    dispatch(updatedApp(true));
  };
  return (
    <div
      data-test="Logo"
      className="logo"
    >
      <Link
        data-test="siteLogoLinkRouter"
        to={{ pathname: '/', state: { flag: true } }}
        onClick={updateApp}
      >
        <img
          className="logo__img"
          src={URL_FOR_LOGO}
          alt="Images-Listing"
          
        />
      </Link>
    </div>
  );
});

export default Logo;
