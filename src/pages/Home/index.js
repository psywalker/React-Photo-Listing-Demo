import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import PhotoCardList from '../../components/PhotoCardList';
import Search from '../../components/Search';
import NavTop from '../../components/NavTop';
import 'antd/dist/antd.css';
import './index.scss';

export default class Home extends PureComponent {
  state = {
    page: 1,
    cards: [],
  }

  componentDidUpdate = (prevProps) => {
    const { cardsData, handleСardsPhotosAction } = this.props;
    const { cards: cardsState } = this.state;
    const { cards: cardsProps } = this.props;
    if (prevProps.cards !== cardsProps) {
      const arr = [...cardsState, ...cardsProps];
      this.setState({ cards: arr });
    } else if (prevProps.cardsData !== cardsData) {
      handleСardsPhotosAction({
        ...cardsData,
        page: 1,
      });
      this.setState({ page: 1, cards: [] });
    }
  };

  componentDidMount = () => {
    const { match: { params: { tag } }, searchTextAction: handleAction, searchChangeInputValueAction } = this.props;
    const searchText = window.localStorage.getItem('search-text');
    if (tag) handleAction(tag, 'tags');
    else if (searchText) searchChangeInputValueAction(searchText);
    else this.getCardsPhotos();
  };

  getCardsPhotos = () => {
    const { cardsData, handleСardsPhotosAction } = this.props;
    handleСardsPhotosAction(cardsData);
  };

  getPaginationChange = () => {
    const { handleСardsPhotosAction, cardsData } = this.props;
    const { page } = this.state;
    handleСardsPhotosAction({
      ...cardsData,
      page: page + 1,
    });
    this.setState({ page: page + 1 });
  };

  getFilterItemValue = (itemText, itemId) => {
    const { filterItemValueAction: handleAction } = this.props;
    window.localStorage.setItem('search-text', itemText);
    handleAction(itemText, itemId);
  };

  getSearchText = (text, tags) => {
    const { searchTextAction: handleAction } = this.props;
    window.localStorage.setItem('search-text', text);
    handleAction(text, tags);
  }

  getChangeInputValue = (text) => {
    const { searchChangeInputValueAction: handleAction } = this.props;
    window.localStorage.setItem('search-text', text);
    handleAction(text);
  }

  render() {
    const {
      filters,
      totalCards,
      cardsData,
      navTopItemActive,
      photolistingRequestError,
      errorRateLimit = '',
    } = this.props;
    const { cards } = this.state;
    const isErrorRateLimit = errorRateLimit === 'Rate Limit Exceeded';

    if (isErrorRateLimit) return <div className="error-text" data-test="errorText">Вы привысили колчическво скачиваний за час. Попробуйте позже.</div>;
    if (photolistingRequestError) return <div className="error-text" data-test="errorText">Error loading photolisting</div>;

    return (
      <div className="App">

        <Search
          data-test="search"
          onSearchInputValue={this.getSearchText}
          onChangeInputValue={this.getChangeInputValue}
          queryText={cardsData.query}
        />

        <NavTop
          data-test="navTop"
          navTopItemActive={navTopItemActive}
          onFilterItemValue={this.getFilterItemValue}
          filters={filters}
        />

        <PhotoCardList
          data-test="photoCard"
          onSearchTagValue={this.getSearchText}
          getPaginationChange={this.getPaginationChange}
          cards={cards}
          totalCards={totalCards}
        />

        {!totalCards && (
          <div className="cards__text-empty" data-test="cardsTextEmpty">
            No images were found for your request. Try to find more.
          </div>
        )}

      </div>
    );
  }
}

Home.propTypes = {
  handleСardsPhotosAction: PropTypes.func,
  filterItemValueAction: PropTypes.func,
  searchTextAction: PropTypes.func,
  searchChangeInputValueAction: PropTypes.func,
  filters: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    filterValue: PropTypes.string,
  })),
  cardsData: PropTypes.shape({
    query: PropTypes.string,
    page: PropTypes.number,
    per_page: PropTypes.number,
  }),
  totalCards: PropTypes.number,
  navTopItemActive: PropTypes.number,
  cards: PropTypes.arrayOf(PropTypes.object),
  photolistingRequestError: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({
      tag: PropTypes.string,
    }),
  }),
  errorRateLimit: PropTypes.string,
};
Home.defaultProps = {
  handleСardsPhotosAction: () => {},
  filterItemValueAction: () => {},
  searchTextAction: () => {},
  searchChangeInputValueAction: () => {},
  filters: [],
  cards: [],
  cardsData: {
    query: 'wallpapers',
    page: 1,
    per_page: 6,
  },
  totalCards: 0,
  navTopItemActive: 2,
  photolistingRequestError: false,
  match: {
    params: {
      tag: '',
    },
  },
  errorRateLimit: '',
};
