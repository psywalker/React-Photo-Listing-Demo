import React, { Component } from 'react';
import Search from './components/Search';
import Filter from './components/Filter';
import PhotoCard from './components/PhotoCard';
import PaginationSelf from './components/PaginationSelf';

import filters from './filters';
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
  constructor(...args) {
    super(...args);
    this.state = {
      filts: filters,
    };
  }

  render() {
    const { filts } = this.state;
    return (
      <div className="App">
        <div className="row">
          <div className="col-12">
            <Search />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <button type="button" className="button-click">Button-Click</button>
            <ul className="filter-list">
              {filts.map(item => (
                <li key={item.id} className="filter-list__item">
                  <Filter key={item.id} filters={item.items} activeFilter={item.name} />
                </li>))
              }
            </ul>
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
