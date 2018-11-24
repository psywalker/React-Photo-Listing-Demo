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
      totalCards: 10,
      navigationItems: [1],
      cardsData: {
        q: '',
        page: 1,
        per_page: 20,
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
  }

  componentDidMount = () => {
    this.getCardsPhotos();
  };

  getCardsPhotos = () => {
    const { cardsData } = this.state;
    this.setState({ isListingLoading: true });
    const API_URL = `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}`;
    let queryStr = '';
    Object.keys(cardsData).forEach((i) => {
      queryStr = `${queryStr}&${i}=${cardsData[i]}`;
    }, cardsData);

    console.log('111:::', API_URL)
    console.log('222:::', queryStr)
    console.log('333:::', `${API_URL}${queryStr}`)

    axios.get(`${API_URL}${queryStr}`)
      .then((res) => {
        const cards = res.data.hits;
        const navigationItems = [];
        const i = (Math.floor(res.data.total / cardsData.per_page)) + cardsData.page;

        if (cardsData.page < 11) {
          for (let k = 1; k < i; k += 1) {
            navigationItems.push(k);
          }
        } else {
          for (let k = cardsData.page - 9; k < i; k += 1) {
            navigationItems.push(k);
          }
        }

        this.setState({
          cards,
          isListingLoading: false,
          totalCards: res.data.total,
          navigationItems,
        });
      })
      .catch(() => {
        console.log('pixabay API not responding');
        this.setState({ isListingLoading: false });
      });
  };

  getFilterItemValue = (item) => {
    const { cardsData } = this.state;
    this.setState({
      cardsData: {
        ...cardsData,
        [item.filterValue]: item.labelValue,
      },
    }, this.getCardsPhotos);
  };

  getNavigationClick = (item) => {
    const { cardsData } = this.state;
    this.setState({
      cardsData: {
        ...cardsData,
        page: item,
      },
    }, this.getCardsPhotos);
  };

  getNavigationPrevClick = () => {
    const { cardsData } = this.state;
    if (cardsData.page) {
      this.setState({
        cardsData: {
          ...cardsData,
          page: cardsData.page - 1,
        },
      }, this.getCardsPhotos);
    }
  };

  getNavigationNextClick = () => {
    const { cardsData, totalCards } = this.state;
    if (cardsData.page <= totalCards) {
      this.setState({
        cardsData: {
          ...cardsData,
          page: cardsData.page + 1,
        },
      }, this.getCardsPhotos);
    }
  };

  getSearchText = (text) => {
    const { cardsData } = this.state;
    this.setState({
      cardsData: {
        ...cardsData,
        q: text,
      },
    }, this.getCardsPhotos);
  }

  onChangeInputValue = (text) => {
    const { cardsData } = this.state;
    this.setState({
      cardsData: {
        ...cardsData,
        q: text,
      },
    });
  }

  render() {
    const {
      filts,
      cards,
      isListingLoading,
      buttonsColor,
      totalCards,
      cardsData,
      navigationItems,
    } = this.state;
    return (
      <div className="App">
        { isListingLoading && (<Spinner />)}
        <div className="row">
          <div className="col-12">
            <Search getSearchInputValue={this.getSearchText} onChangeInputValue={this.onChangeInputValue}/>
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
                    <PhotoCard photoName={item.largeImageURL} title={item.user} tags={item.tags.split(',')} />
                  </li>))
                }
              </ul>
            )
            }
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <PaginationSelf
              totalCards={totalCards}
              page={cardsData.page}
              perPage={cardsData.per_page}
              navigationItems={navigationItems}
              navigationActiveItem={cardsData.page}
              getNavigationClick={this.getNavigationClick}
              getNavigationPrevClick={this.getNavigationPrevClick}
              getNavigationNextClick={this.getNavigationNextClick}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
