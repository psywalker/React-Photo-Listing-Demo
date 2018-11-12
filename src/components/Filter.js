import React, { Component } from 'react';
import {DropdownItem} from './DropdownItem';
import {Dropdown, DropdownToggle, DropdownMenu } from 'mdbreact';


export class Filter extends Component {

    state = {
        activeFilter: 'filter1'
    };

    render() {
        return (
            <Dropdown className="ml-3">
                <DropdownToggle caret color="primary ml-0">
                    {this.state.activeFilter}
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem
                        {...this.state}
                        filterType="filter1"
                        onFilterClick={() => this.setState({activeFitler: "filter1"})}
                    />
                    <DropdownItem
                        {...this.state}
                        filterType="filter2"
                        onFilterClick={() => this.setState({activeFitler: "filter2"})}
                    />
                    <DropdownItem
                        {...this.state}
                        filterType="filter3"
                        onFilterClick={() => this.setState({activeFitler: "filter3"})}
                    />
                    <DropdownItem
                        {...this.state}
                        filterType="filter4"
                        onFilterClick={() => this.setState({activeFitler: "filter4"})}
                    />
                </DropdownMenu>
            </Dropdown>
        );
    }

}