import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';
import './index.scss';

const NavTop = memo(({
  navTopItemActive,
  onFilterItemValue,
  filters,
  changeNvTopItemActive,
}) => (
  <ul className="nav-top" data-test="navTop">
    {filters.map(item => (
      <li
        key={item.id}
        data-test="navTopItem"
        className={`nav-top__item ${item.border ? 'nav-top__item_border-right' : ''}`}
      >
        <Tag
          data-test="navTopItemTag"
          color={`${item.id === navTopItemActive ? 'purple' : ''}`}
          onClick={() => {
            changeNvTopItemActive(item.id);
            if (item.id !== navTopItemActive) onFilterItemValue(item.filterValue, item.id);
          }}
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
  changeNvTopItemActive: PropTypes.func,
  onFilterItemValue: PropTypes.func,
  navTopItemActive: PropTypes.number,
};
NavTop.defaultProps = {
  filters: [],
  navTopItemActive: 0,
  onFilterItemValue: () => {},
  changeNvTopItemActive: () => {},
};
export default NavTop;
