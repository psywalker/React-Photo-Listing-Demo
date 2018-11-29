import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Search from '../../components/Search';
import PhotoCard from '../../components/PhotoCard';
import NavTop from '../../components/NavTop';
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
      navTopItemActive: 0,
      queryText: '',
      cardsData: {
        query: '',
        page: 1,
        per_page: 20,
        //order: 'latest',
        //image_type: 'all',
        //orientation: 'all',
        //category: 'all',
      },
    };
  }

  componentDidMount = () => {
    this.handleCardsPhotos();
  };

  handleCardsPhotos = (text) => {
    const { cardsData } = this.state;
    this.setState({ isListingLoading: true });
    const API_URL = `&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`;
    let queryStr = 'https://api.unsplash.com/photos?';
    if(text === 'search') queryStr = 'https://api.unsplash.com/search/photos?';
    Object.keys(cardsData).forEach((i) => {
      queryStr += `&${i}=${cardsData[i]}`;
    }, cardsData);
    console.log('111:::', `${queryStr}${API_URL}`)
    axios.get(`${queryStr}${API_URL}`)
      .then((res) => {
        console.log('222:::', res)

        let cards = res.data;
        let totalCards = parseInt(res.headers['x-total'], 10);
        if(text === 'search') {
          cards = res.data.results;
          totalCards = res.data.total;
        }

        this.setState({
          cards,
          isListingLoading: false,
          totalCards,
        }); 
      })
      .catch(() => {
        console.log('pixabay API not responding');
        this.setState({ isListingLoading: false });
      });
  };

  handleFilterItemValue = (itemText, itemId) => {
    const { cardsData } = this.state;
    this.setState({
      navTopItemActive: itemId,
      cardsData: {
        ...cardsData,
        page: 1,
        query: itemText,
      },
    }, ()=> {this.handleCardsPhotos('search')});
  };

  handleNavigationClick = (item) => {
    const { cardsData } = this.state;
    this.setState({
      cardsData: {
        ...cardsData,
        page: item,
      },
    }, ()=> {
      if(cardsData.query) this.handleCardsPhotos('search')
      else this.handleCardsPhotos()
    });
  };

  handleNavigationPrevClick = () => {
    const { cardsData } = this.state;
    if (cardsData.page) {
      this.setState({
        cardsData: {
          ...cardsData,
          page: cardsData.page - 1,
        },
      }, ()=> {
        if(cardsData.query) this.handleCardsPhotos('search')
        else this.handleCardsPhotos()
      });
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
      }, ()=> {
        console.log('333::::', cardsData.query)
        if(cardsData.query) this.handleCardsPhotos('search')
        else this.handleCardsPhotos()
      });
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
    }, ()=> {this.handleCardsPhotos('search')});
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
      totalCards,
      cardsData,
      navTopItemActive
    } = this.state;

    return (
      <div className="App">
        { isListingLoading && (<Spinner />)}
        <div className="row">
          <div className="col-12">
            <Search onSearchInputValue={this.handleSearchText} onChangeInputValue={this.handleChangeInputValue} queryText={cardsData.query} />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <ul className="nav-top">
            {filts.map((item, i) => (
                <li key={item.id} className={`nav-top__item ${item.border? 'nav-top__item_border-right': ''}`}>
                  <NavTop 
                    navTopItemActive={navTopItemActive}
                    itemId={item.id}
                    onFilterItemValue={this.handleFilterItemValue} 
                    key={item.id} label={item.label} 
                    filterValue={item.filterValue} 
                  />
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
                    <Link to={`/photo/${item.id}`}>
                      <PhotoCard photoName={item.urls.full} title={item.user.first_name} />
                    </Link>
                  </li>))
                }
              </ul>
            )
            }
            {!totalCards && (<h2 className="cards__text-empty pl-3">No images were found for your request. Try to find more.</h2>)}
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
