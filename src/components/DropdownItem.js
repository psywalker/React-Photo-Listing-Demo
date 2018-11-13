import React from 'react';

const DropdownItem = ({onFilterClick, activeFilter, filterType, hasPadding}) => <div
    onClick={onFilterClick}
    className={`dropdown-item ${activeFilter === filterType ? 'active' : ''}`}
    style={(hasPadding) ? {paddingLeft: '34px'} : {}}
    >
    {filterType}
  {(activeFilter === filterType) && <i className="check">✓</i>}
  </div>

export default DropdownItem