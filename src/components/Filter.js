import React, { Component } from 'react';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';


export class Filter extends Component {

    state = {};


    render() {
        return (
            <Dropdown className="ml-3">
                <DropdownToggle caret color="primary ml-0">
                    Material dropdown
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem href="#">Action</DropdownItem>
                    <DropdownItem href="#">Another Action</DropdownItem>
                    <DropdownItem href="#">Something else here</DropdownItem>
                    <DropdownItem href="#">Something else here</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
    }

}