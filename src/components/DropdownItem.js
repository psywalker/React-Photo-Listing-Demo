import React from 'react';

const DropdownItem = ({onFilterClick, activeFilter, filterType}) => <div onClick={onFilterClick} className={`dropdown-item ${activeFilter === filterType ? 'active' : ''}`}>{filterType}</div>

export default DropdownItem