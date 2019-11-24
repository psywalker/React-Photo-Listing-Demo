import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { URL_FOR_LOGO, QUERY_TEXT_DEFAULT } from '../../constants';
import { updateTagsStartAction } from '../../actions';
import './index.scss';

const Logo = memo(() => {
  const dispatch = useDispatch();
  return (
    <div
      data-test="Logo"
      className="logo"
    >
      <Link
        data-test="siteLogoLinkRouter"
        to={{ pathname: '/', state: { flag: true } }}
        onClick={() => dispatch(updateTagsStartAction(QUERY_TEXT_DEFAULT))}
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
