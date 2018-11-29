import React, { Component } from 'react';
import axios from 'axios';
import Search from '../../components/Search';
import Filter from '../../components/Filter';
import PhotoCard from '../../components/PhotoCard';
import Spinner from '../../components/Spinner';
import PaginationSelf from '../../components/Pagination';
import filters from '../../filters';
import './App.css';

class App extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      filts: filters,
      isListingLoading: false,
      cards: [],
      totalCards: 10,
      cardsData: {
        query: '',
        page: 1,
        per_page: 20,
        //order: 'latest',
        //image_type: 'all',
        //orientation: 'all',
        //category: 'all',
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
    this.handleCardsPhotos();
  };

  handleCardsPhotos = () => {
    const { cardsData } = this.state;
    this.setState({ isListingLoading: true });
    const API_URL = `&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`;
    let queryStr = 'https://api.unsplash.com/photos?';
    Object.keys(cardsData).forEach((i) => {
      queryStr += `&${i}=${cardsData[i]}`;
    }, cardsData);

    axios.get(`${queryStr}${API_URL}`)
      .then((res) => {
        const cards = res.data;
        console.log('222::', res)
        this.setState({
          cards,
          isListingLoading: false,
          totalCards: parseInt(res.headers['x-total'], 10),
        }); 
      })
      .catch(() => {
        console.log('pixabay API not responding');
        this.setState({ isListingLoading: false });
      });
  };

  handleFilterItemValue = (item) => {
    const { cardsData } = this.state;
    this.setState({
      cardsData: {
        ...cardsData,
        page: 1,
        [item.filterValue]: item.labelValue,
      },
    }, this.handleCardsPhotos);
  };

  handleNavigationClick = (item) => {
    const { cardsData } = this.state;
    this.setState({
      cardsData: {
        ...cardsData,
        page: item,
      },
    }, this.handleCardsPhotos);
  };

  handleNavigationPrevClick = () => {
    const { cardsData } = this.state;
    if (cardsData.page) {
      this.setState({
        cardsData: {
          ...cardsData,
          page: cardsData.page - 1,
        },
      }, this.handleCardsPhotos);
    }
  };

  handleNavigationNextClick = () => {
    const { cardsData, totalCards } = this.state;
    if (cardsData.page <= totalCards) {
      this.setState({
        cardsData: {
          ...cardsData,
          page: cardsData.page + 1,
        },
      }, this.handleCardsPhotos);
    }
  };

  handleSearchText = (text) => {
    const { cardsData } = this.state;
    this.setState({
      cardsData: {
        ...cardsData,
        query: text,
        page: 1,
      },
    }, this.handleCardsPhotos);
  }

  handleChangeInputValue = (text) => {
    const { cardsData } = this.state;
    this.setState({
      cardsData: {
        ...cardsData,
        query: text,
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
      cardsData
    } = this.state;

    return (
      <div className="App">
        { isListingLoading && (<Spinner />)}
        <div className="row">
          <div className="col-12">
            <Search onSearchInputValue={this.handleSearchText} onChangeInputValue={this.handleChangeInputValue} />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <ul className="filter-list">
              {filts.map((item, i) => (
                <li key={item.id} className="filter-list__item">
                  <Filter onFilterItemValue={this.handleFilterItemValue} key={item.id} filters={item.items} activeFilter={item.defaultLabel} buttonColor={i < buttonsColor.length ? buttonsColor[i] : 'default'} />
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
                    <PhotoCard photoName={item.urls.full} title={item.user.first_name} />
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
              perPage={cardsData.per_page}
              onNavigationClick={this.handleNavigationClick}
              onNavigationPrevClick={this.handleNavigationPrevClick}
              onNavigationNextClick={this.handleNavigationNextClick}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
