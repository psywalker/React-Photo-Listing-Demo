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
      cardsData: {
        order: 'latest',
        image_type: 'all',
        orientation: 'all',
        category: 'all',
      },
      buttonsColor: [
        'primary',
        'warning',
        'danger',
        'success',
        'elegant',
        'ins',
        'default',
      ],
    };
    this.getFilterItemValue = this.getFilterItemValue.bind(this);
    this.getCardsPhotos = this.getCardsPhotos.bind(this);
  }

  componentDidMount() {
    this.getCardsPhotos();
  }

  getCardsPhotos() {
    this.setState({ isListingLoading: true });
    const { cardsData } = this.state;
    let queryStr = 'https://pixabay.com/api/?key=5902386-0f23bc626123b6d6520f3ef4b&q=';
    Object.keys(cardsData).forEach((i) => {
      queryStr = `${queryStr}&${i}=${cardsData[i]}`;
    }, cardsData);
    axios.get(queryStr)
      .then((res) => {
        const cards = res.data.hits;
        this.setState({ cards, isListingLoading: false });
      })
      .catch(() => {
        console.log('pixabay API not responding');
        this.setState({ isListingLoading: false });
      });
  }

  getFilterItemValue(item) {
    const { cardsData } = this.state;
    const clonCardsData = Object.assign({}, cardsData);
    clonCardsData[item.filterValue] = item.labelValue;
    this.setState({ cardsData: clonCardsData });
    this.getCardsPhotos();

  }

  render() {
    const {
      filts,
      cards,
      isListingLoading,
      buttonsColor,
    } = this.state;

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
              {filts.map((item, i) => (
                <li key={item.id} className="filter-list__item">
                  <Filter getFilterItemValue={this.getFilterItemValue} key={item.id} filters={item.items} activeFilter={item.defaultLabel} buttonColor={i < buttonsColor.length ? buttonsColor[i] : 'default'} />
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
                    <PhotoCard photoName={item.largeImageURL} title={item.user} tags={item.tags} />
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
