import React, { Component } from 'react';
import axios from 'axios';
import Search from './components/Search/Search';
import Filter from './components/Filter/Filter';
import PhotoCard from './components/PhotoCard/PhotoCard';
import Spinner from './components/Spinner/Spinner';
import PaginationSelf from './components/PaginationSelf/PaginationSelf';
import filters from './filters';
import './App.css';

class App extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      filts: filters,
      isListingLoading: false,
      cards: [],
    };
  }

  componentDidMount() {
    this.setState({ isListingLoading: true });
    axios.get('https://pixabay.com/api/?key=10435828-fcd242d0a49be22b3a7387dbb&q=yellow+flowers&image_type=photo&pretty=true')
      .then((res) => {
        const cards = res.data.hits;
        this.setState({ cards });
        this.setState({ isListingLoading: false });
      })
      .catch(() => {
        console.log('pixabay API not responding');
        this.setState({ isListingLoading: false });
      });
  }

  render() {
    const { filts, cards, isListingLoading } = this.state;
    return (
      <div className="App">
        { isListingLoading && (<Spinner />)}
        <div className="row">
          <div className="col-12">
            <Search />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
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
            {!isListingLoading && (
              <ul className="photo-list">
                {
                cards.map(item => (
                  <li key={item.id} className="photo-list__item pl-3">
                    <PhotoCard photoName={item.largeImageURL}/>
                  </li>))
                }
              </ul>
            )
            }
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
