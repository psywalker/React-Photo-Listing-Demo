import React, { memo } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { withLastLocation } from 'react-router-last-location';
import { ButtonBack } from '../index';
import Logo from '../Logo';
import DropdownLogin from '../DropdownLogin';
import SelectLanguage from '../SelectLanguage';
import Search from '../Search';
import NavTop from '../NavTop';
import './index.scss';

export const HeaderApp = withRouter(memo(() => (
  <div className="header">
    <div className="header__inner">
      <div className="header__item">
        <div className="header__logo">
          <Logo />

          <Route
            data-test="btnBackRoute"
            path="/:id"
            component={() => (
              <ButtonBack
                data-test="btnBack"
                style={{ marginLeft: '10px' }}
              />
            )}
          />
        </div>

        <Route
          exact
          path="/"
          render={() => (
            <Search data-test="search" />
          )}
        />
        <SelectLanguage />
        <DropdownLogin />
      </div>
      <Route
        exact
        path="/"
        component={() => (
          <div className="header__item">
            <NavTop data-test="navTop" />
          </div>
        )}
      />
    </div>
  </div>
)));

export default withLastLocation(HeaderApp);
