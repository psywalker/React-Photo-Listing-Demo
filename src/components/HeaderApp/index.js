import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';
import { withLastLocation } from 'react-router-last-location';
import { connect } from 'react-redux';
import { ButtonBack } from '../index';
import Logo from '../Logo';
import DropdownLogin from '../DropdownLogin';
import SelectLanguage from '../SelectLanguage';
import Search from '../Search';
import NavTop from '../NavTop';
import getURLParam from '../../utils/getURLParam';
import { NAV_TOP_ITEM_ACTIVE_DEFAULT, QUERY_TEXT_DEFAULT } from '../../constants';
import {
  logoutAction,
  searchTextAction,
  searchChangeInputValueAction,
  filterItemValueAction,
  loginSuccess,
  updatedApp,
} from '../../actions';
import './index.scss';

export const HeaderApp = withRouter(memo((props) => {
  const {
    history,
    profileName,
    profilePhotoUrl,
    profileFullName,
    logoutAction: handleAction,
    searchTextAction,
    filterItemValueAction,
    filters,
    updatedApp,
  } = props;

  const [queryText, setQueryText] = useState(QUERY_TEXT_DEFAULT);
  const [navTopItemActive, setNavTopItemActive] = useState(NAV_TOP_ITEM_ACTIVE_DEFAULT);
  const [updateFlag, setUpdateFlag] = useState(false);

  const handleLoguotHeader = () => {
    handleAction();
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('loginData');
    history.push('/');
  };

  const handleUrl = (str) => {
    const newUrl = `?search=${str}`;
    history.push(newUrl, {});
  };

  const getSearchText = (text, tags) => {
    searchTextAction(text, tags);
    handleUrl(text);
  };

  const getFilterItemValue = (itemText, itemId) => {
    filterItemValueAction(itemText, itemId);
    handleUrl(itemText);
  };

  const changeNvTopItemActive = (num) => {
    setNavTopItemActive(num);
  };

  const changeQueryText = (text) => {
    setQueryText(text);
  };

  useEffect(() => {
    const tagName = getURLParam(window.location, 'search');
    let itemActive = NAV_TOP_ITEM_ACTIVE_DEFAULT;

    if (tagName) {
      const tag = filters.filter(item => item.label.toLowerCase() === tagName.toLowerCase());
      itemActive = tag.length ? tag[0].id : null;
      setNavTopItemActive(itemActive);
    }

    if (updateFlag) {
      setUpdateFlag(false);
      setNavTopItemActive(NAV_TOP_ITEM_ACTIVE_DEFAULT);
      setQueryText(QUERY_TEXT_DEFAULT)
    }
  }, [queryText, filters, updateFlag]);

  return (
    <div className="header">
      <div className="header__inner">
        <div className="header__item">
          <div className="header__logo">
            <Logo setUpdateFlag={setUpdateFlag} />

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
              <Search
                data-test="search"
                onSearchInputValue={getSearchText}
                changeQueryText={changeQueryText}
                queryText={queryText}
                navTopItemActive={navTopItemActive}
                history={history}
                updatedApp={updatedApp}
              />
            )}
          />
          <SelectLanguage />
          <DropdownLogin
            profileName={profileName}
            profileFullName={profileFullName}
            profilePhotoUrl={profilePhotoUrl}
            handleLoguotHeader={handleLoguotHeader}
          />
        </div>
        <Route
          exact
          path="/"
          component={() => (
            <div className="header__item">
              <NavTop
                data-test="navTop"
                navTopItemActive={navTopItemActive}
                onFilterItemValue={getFilterItemValue}
                changeNvTopItemActive={changeNvTopItemActive}
                filters={filters}
              />
            </div>
          )}
        />
      </div>
    </div>
  );
}));

HeaderApp.propTypes = {
  history: PropTypes.shape({
    prop: PropTypes.string,
  }),
  logoutAction: PropTypes.func,
  profilePhotoUrl: PropTypes.string,
  profileName: PropTypes.string,
  profileEmail: PropTypes.string,
  fetching: PropTypes.bool,
};
HeaderApp.defaultProps = {
  history: {},
  logoutAction: () => {},
  profilePhotoUrl: '',
  profileName: '',
  profileEmail: '',
  fetching: false,
};

export const mapStateToProps = (state) => {
  const { login, photolisting, updatedApp: updateFlag } = state;
  return { ...login, ...photolisting, updateFlag };
};

const mapDispatchToProps = {
  loginSuccess,
  logoutAction,
  searchTextAction,
  searchChangeInputValueAction,
  filterItemValueAction,
  updatedApp,
};

export default withLastLocation(connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderApp));
