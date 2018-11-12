import React, { Component } from 'react';
import {DropdownItem} from './DropdownItem';
import {Dropdown, DropdownToggle, DropdownMenu } from 'mdbreact';


export class Filter extends Component {

    state = {
        activeFilter: 'filter1',
        showDropdown: false,
        filters: ['filter1', 'filter2', 'filter3', 'filter4']
    };

    render() {
        const listItems = this.state.filters.map((item,i) =>
            (<DropdownItem
                key={i}
                activeFilter={this.state.activeFilter}
                filterType={item}
                onFilterClick={() => this.setState({
                    activeFilter: item,
                    showDropdown: false
                })}
            />));
        return (
            <Dropdown className="ml-3">
                <DropdownToggle caret color="primary ml-0" onClick={() => this.setState({showDropdown: true})}>
                    {this.state.activeFilter}
                </DropdownToggle>
                {this.state.showDropdown && <DropdownMenu style={{display: 'block'}} >
                    {listItems}
                </DropdownMenu>}
            </Dropdown>
        );
    }

}