import React, { Component } from 'react';
import {DropdownItem} from './DropdownItem';
import {Dropdown, DropdownToggle, DropdownMenu } from 'mdbreact';


export class Filter extends Component {

    state = {
        activeFilter: 'filter1',
        showDropdown: false,
    };

    render() {
        return (
            <Dropdown className="ml-3">
                <DropdownToggle caret color="primary ml-0" onClick={() => this.setState({showDropdown: true})}>
                    {this.state.activeFilter}
                </DropdownToggle>
                {this.state.showDropdown && <DropdownMenu style={{display: 'block'}} >
                    <DropdownItem
                        {...this.state}
                        filterType="filter1"
                        onFilterClick={() => this.setState({activeFilter: "filter1", showDropdown: false})}
                    />
                    <DropdownItem
                        {...this.state}
                        filterType="filter2"
                        onFilterClick={() => this.setState({activeFilter: "filter2", showDropdown: false})}
                    />
                    <DropdownItem
                        {...this.state}
                        filterType="filter3"
                        onFilterClick={() => this.setState({activeFilter: "filter3", showDropdown: false})}
                    />
                    <DropdownItem
                        {...this.state}
                        filterType="filter4"
                        onFilterClick={() => this.setState({activeFilter: "filter4", showDropdown: false})}
                    />
                </DropdownMenu>}
            </Dropdown>
        );
    }

}