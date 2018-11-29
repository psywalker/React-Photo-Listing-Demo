import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const NavTop = ({ onFilterItemValue, label, filterValue, itemId, navTopItemActive }) => (
    <button className={`nav-top__btn ${itemId === navTopItemActive ? 'nav-top__btn_active': ''}`} onClick={() => onFilterItemValue(filterValue, itemId)}>{label}</button>
  )

  NavTop.propTypes = {
    label: PropTypes.string,
    filterValue: PropTypes.string,
    onFilterItemValue: PropTypes.func,
    itemId: PropTypes.number,
    navTopItemActive: PropTypes.number,
  };
  NavTop.defaultProps = {
    itemId: 0,
    navTopItemActive: 0,
    label: '',
    filterValue: '',
    onFilterItemValue: () => { },
  };
  export default NavTop;