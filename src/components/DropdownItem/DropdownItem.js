import React from 'react';
import PropTypes from 'prop-types';

const DropdownItem = ({
  onFilterClick,
  activeFilter,
  filterType,
  hasPadding,
}) => (
  <div
    role="presentation"
    onClick={onFilterClick}
    className={`dropdown-item ${activeFilter === filterType ? 'active' : ''}`}
    style={(hasPadding) ? { paddingLeft: '34px' } : {}}
  >
    {filterType}
    {(activeFilter === filterType) && <i className="check">✓</i>}
  </div>);

DropdownItem.propTypes = {
  onFilterClick: PropTypes.func,
  activeFilter: PropTypes.string,
  filterType: PropTypes.string,
  hasPadding: PropTypes.bool,
};
DropdownItem.defaultProps = {
  onFilterClick: PropTypes.func,
  activeFilter: '',
  filterType: '',
  hasPadding: false,
};


export default DropdownItem;
