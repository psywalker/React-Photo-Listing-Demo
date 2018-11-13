import React, { Component } from 'react';

export class DropdownItem extends Component {

    state = {

    };

    render() {
        return (
            <div
                onClick={this.props.onFilterClick}
                className={`dropdown-item ${this.props.activeFilter === this.props.filterType ? 'active' : ''}`}>
                {this.props.filterType}
            </div>
        );
    }

}