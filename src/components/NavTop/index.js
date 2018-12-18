import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from "antd";
import './index.css';

const NavTop = ({ onFilterItemValue, label, filterValue, itemId, navTopItemActive }) => (
    <Tag color={`${itemId === navTopItemActive ? 'purple': ''}`} onClick={() => onFilterItemValue(filterValue, itemId)}>{label}</Tag>
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