import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';
import './index.scss';

const NavTop = memo(({
  navTopItemActive,
  onFilterItemValue,
  filters,
}) => (
  <ul className="nav-top" data-test="navTop">
    {filters.map(item => (
      <li
        key={item.id}
        data-test="navTopItem"
        className={`nav-top__item ${item.border ? 'nav-top__item_border-right' : ''}`}
      >
        <Tag
          color={`${item.id === navTopItemActive ? 'purple' : ''}`}
          onClick={() => onFilterItemValue(item.filterValue, item.id)}
        >
          {item.label}
        </Tag>
      </li>
    ))}
  </ul>
));

NavTop.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    filterValue: PropTypes.string,
  })),
  onFilterItemValue: PropTypes.func,
  navTopItemActive: PropTypes.number,
};
NavTop.defaultProps = {
  filters: [],
  navTopItemActive: 0,
  onFilterItemValue: () => { },
};
export default NavTop;
