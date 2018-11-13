import React, { Component } from 'react';
import DropdownItem from './DropdownItem';
import {Dropdown, DropdownToggle, DropdownMenu } from 'mdbreact';


export class Filter extends Component {

  state = {
    activeFilter: this.props.activeFilter,
    showDropdown: false,
  };

  renderListItems(filters, activeFilter){
    return filters.map((item,i) => (
      <DropdownItem
        key={i}
        activeFilter={this.state.activeFilter}
        filterType={item.text}
        hasPadding={item.hasPadding}
        onFilterClick={() => this.setState({activeFilter: item.text, showDropdown: false})}
      />
    ))
  }

  render() {
    const {showDropdown, activeFilter} = this.state;
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