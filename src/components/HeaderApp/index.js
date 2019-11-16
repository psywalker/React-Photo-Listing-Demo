import React, { memo } from 'react';
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
    searchChangeInputValueAction,
    filterItemValueAction,
    filters,
    cardsData,
  } = props;
  
  const handleLoguotHeader = () => {
    handleAction();
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('loginData');
    history.push('/');
  };
  const getDataSearch = () => {
    const cardsDataQuery = cardsData.query;
    const tagName = getURLParam(window.location, 'search');
    let queryText = QUERY_TEXT_DEFAULT;
    let navTopItemActive = NAV_TOP_ITEM_ACTIVE_DEFAULT;

    if (tagName) {
      const tag = filters.filter(item => item.label.toLowerCase() === tagName.toLowerCase());
      navTopItemActive = tag.length ? tag[0].id : null;
      queryText = cardsDataQuery;
    }

    if (!tagName && window.location.href.indexOf('?search') !== -1) navTopItemActive = null;

    return {
      queryText,
      navTopItemActive,
    };
  };

  const handleUrl = (str) => {
    const newUrl = `?search=${str}`;
    history.push(newUrl, {});
  };

  const getSearchText = (text, tags) => {
    searchTextAction(text, tags);
    handleUrl(text);
  };

  const getChangeInputValue = (text) => {
    if (text) {
      searchChangeInputValueAction(text);
      handleUrl(text);
    } else {
      handleUrl('');
    }
  };
  const getFilterItemValue = (itemText, itemId) => {
    filterItemValueAction(itemText, itemId);
    handleUrl(itemText);
  };

  const dataSearch = getDataSearch();
  return (
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
              <Search
                data-test="search"
                onSearchInputValue={getSearchText}
                onChangeInputValue={getChangeInputValue}
                queryText={dataSearch.queryText}
                history={history}
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
                navTopItemActive={dataSearch.navTopItemActive}
                onFilterItemValue={getFilterItemValue}
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
  const { login, photolisting } = state;
  return { ...login, ...photolisting };
};

const mapDispatchToProps = {
  loginSuccess,
  logoutAction,
  searchTextAction,
  searchChangeInputValueAction,
  filterItemValueAction,
};

export default withLastLocation(connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderApp));
