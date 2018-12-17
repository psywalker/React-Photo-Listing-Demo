import React, { Component } from 'react';
import axios from 'axios';
import { Pagination } from 'antd';
import Search from '../../components/Search';
import PhotoCard from '../../components/PhotoCard';
import NavTop from '../../components/NavTop';
import Spinner from '../../components/Spinner';
import filters from '../../filters';
import './home.css';
import 'antd/dist/antd.css';

class Home extends Component {
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
  handlePaginationChange = (current) => { 
    const { cardsData } = this.state;

    this.setState({
      cardsData: {
        ...cardsData,
        page: current,
      },
    }, this.handleCardsPhotos);

  };

  handleCardsPhotos = () => {
    const { cardsData } = this.state;
    this.setState({ isListingLoading: true });
    axios.get('https://api.unsplash.com/search/photos?', {
      params: {
        ...cardsData, 
        client_id: process.env.REACT_APP_UNSPLASH_API_KEY
      },
    }).then((res) => {
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
                        photoDesc={item.description}
                        title={item.user.first_name} 
                        tags={item.photo_tags}  
                        photoID={item.id}
                        userID={item.user.username}
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
          <div className="col-12 pagination">
            <Pagination className="ml-3" showSizeChanger onChange={this.handlePaginationChange} current={cardsData.page} defaultCurrent={1} total={totalCards} />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
