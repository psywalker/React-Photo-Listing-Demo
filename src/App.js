import React, { Component } from 'react';
import {FormInline, Fa, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="row">
          <div className="col-8">
            <div class="flex-container">
              <a href="#" class="logo">LOGO</a>
              <FormInline className="md-form">
                <Fa icon="search" />
                <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search"/>
              </FormInline>
            </div>
          </div>
          <div className="col-4">

          </div>
        </div>

        <div className="row">
          <div className="col-8">      
            <Dropdown>
              <DropdownToggle caret color="primary">
              Material dropdown
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem href="#">Action</DropdownItem>
                <DropdownItem href="#">Another Action</DropdownItem>
                <DropdownItem href="#">Something else here</DropdownItem>
                <DropdownItem href="#">Something else here</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="col-4">

          </div>
        </div>

        <div className="row">
          <div className="col-12">      
            <ul class="photo-list">
              <li class="photo-list__item">
                <a href="#" class="photo-list__link">
                  <img src="./images/avenue.jpg" class="photo-list__img" />
                </a>
              </li>
            </ul>
          </div>
          <div className="col-4">

          </div>
        </div>
      </div>
    );
  }
}

export default App;
