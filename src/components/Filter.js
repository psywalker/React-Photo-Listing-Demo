import React, { Component } from 'react';
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
                    <div
                        className={`dropdown-item ${this.state.activeFilter === 'filter1' ? 'active' : ''}`}
                        onClick={() => this.setState({activeFilter: 'filter1'})} >filter1
                    </div>
                    <div
                        className={`dropdown-item ${this.state.activeFilter === 'filter2' ? 'active' : ''}`}
                        onClick={() => this.setState({activeFilter: 'filter2'})} >filter2
                    </div>
                    <div
                        className={`dropdown-item ${this.state.activeFilter === 'filter3' ? 'active' : ''}`}
                        onClick={() => this.setState({activeFilter: 'filter3'})} >filter3
                    </div>
                    <div
                        className={`dropdown-item ${this.state.activeFilter === 'filter4' ? 'active' : ''}`}
                        onClick={() => this.setState({activeFilter: 'filter4'})} >filter4
                    </div>
                </DropdownMenu>
            </Dropdown>
        );
    }

}