import React, { Component } from 'react';

export class DropdownItem extends Component {

    state = {

    };

    render() {
        console.log('this.props.filterType::', this.props.filterType)
        return (
            <div
                onClick={this.props.onFilterClick}
                className={`dropdown-item ${this.props.activeFilter === this.props.filterType ? 'active' : ''}`}>
                {this.props.filterType}
            </div>
        );
    }

}