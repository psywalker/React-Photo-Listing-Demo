import React, { Component } from 'react';
import {Search} from './components/Search';
import {Filter} from './components/Filter';
import {PhotoCard} from './components/PhotoCard';
import {PaginationSelf} from './components/PaginationSelf';

import avenue from './images/avenue.jpg';
import cosmea from './images/cosmea.jpg';
import fire from './images/fire.jpg';
import gerbera from './images/gerbera.jpg';
import hybrid from './images/hybrid.jpg';
import lane from './images/lane.jpg';
import leaf from './images/leaf.jpg';
import rose from './images/rose.jpg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="row">
          <div className="col-8">
            <Search />
          </div>
          <div className="col-4">

          </div>
        </div>

        <div className="row">
          <div className="col-8">      
            <Filter />
          </div>
          <div className="col-4">

          </div>
        </div>

        <div className="row">
          <div className="col-12">      
            <ul className="photo-list">
              <li className="photo-list__item pl-3">
                <PhotoCard photoName={avenue} />
              </li>
              <li className="photo-list__item pl-3">
                  <PhotoCard photoName={cosmea} />
              </li>
              <li className="photo-list__item pl-3">
                  <PhotoCard photoName={fire} />
              </li>
              <li className="photo-list__item pl-3">
                  <PhotoCard photoName={gerbera} />
              </li>
              <li className="photo-list__item pl-3">
                  <PhotoCard photoName={hybrid} />
              </li>
              <li className="photo-list__item pl-3">
                  <PhotoCard photoName={lane} />
              </li>
              <li className="photo-list__item pl-3">
                  <PhotoCard photoName={leaf} />
              </li>
              <li className="photo-list__item pl-3">
                  <PhotoCard photoName={rose} />
              </li>
            </ul>
          </div>
          <div className="col-4">

          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <PaginationSelf />
          </div>
        </div>
      </div>
    );
  }
}

export default App;