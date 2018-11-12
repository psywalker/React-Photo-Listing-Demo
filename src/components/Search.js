import React, { Component } from 'react';
import {FormInline, Fa} from 'mdbreact';

export class Search extends Component {

    state = {};


    render() {
        return (
            <div class="flex-container">
                <FormInline className="md-form ml-3">
                    <Fa icon="search" />
                    <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search"/>
                </FormInline>
            </div>
        );
    }

}