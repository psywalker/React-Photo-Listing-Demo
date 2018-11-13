import React, { Component } from 'react';
import DropdownItem from './DropdownItem';
import {Dropdown, DropdownToggle, DropdownMenu } from 'mdbreact';


export class Filter extends Component {

  state = {
    activeFilter: 'filter1',
    showDropdown: false,
  };

  renderListItems(filters){
    return filters.map((item,i) => (
      <DropdownItem
        key={i}
        activeFilter={this.state.activeFilter}
        filterType={item}
        onFilterClick={() => this.setState({activeFilter: item, showDropdown: false})}
      />
    ))
  }

  render() {
    const {activeFilter, showDropdown} = this.state;
    const {filters} = this.props;

    return (
      <Dropdown className="ml-3">
        <DropdownToggle caret color="primary ml-0" onClick={() => this.setState({showDropdown: true})}>
          {activeFilter}
        </DropdownToggle>
        {showDropdown && <DropdownMenu style={{display: 'block'}} >
          {this.renderListItems(filters)}
        </DropdownMenu>}
      </Dropdown>
    );
  }
}