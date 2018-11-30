import React, { Component } from 'react';
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
      navTopItemActive: 2,
      queryText: '',
      cardsData: {
        query: 'wallpapers',
        page: 1,
        per_page: 6,
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
    let queryStr = 'https://api.unsplash.com/search/photos?';
    Object.keys(cardsData).forEach((i) => {
      queryStr += `&${i}=${cardsData[i]}`;
    }, cardsData);
    axios.get(`${queryStr}${API_URL}`)
      .then((res) => {

        const cards = res.data.results;
        const totalCards = res.data.total;
        
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
      totalCards,
      cardsData,
      navTopItemActive,
    } = this.state;
    //const tags = Object.values(obj);
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
                cards.map((item, index) => (
                  <li key={item.id} className="photo-list__item pl-3">
                      <PhotoCard 
                        photoName={item.urls.regular} 
                        title={item.user.first_name} 
                        tags={item.photo_tags}  
                        photoID={item.id}
                        userAvatar={item.user.profile_image.small}
                        onSearchTagValue={this.handleSearchText}
                      />
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
