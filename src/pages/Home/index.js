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
    }
    if (JSON.stringify(prevProps.cardsData) !== JSON.stringify(cardsData)) {
      handleСardsPhotosAction({
        ...cardsData,
        page: 1,
      });
      this.setState({ page: 1, cards: [] });
    }
  };

  componentDidMount = () => {
    const { match: { params: { tag } }, searchTextAction: handleAction } = this.props;
    if (tag) handleAction(tag, 'tags');
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
    handleAction(itemText, itemId);
  };

  getSearchText = (text, tags) => {
    const { searchTextAction: handleAction } = this.props;
    handleAction(text, tags);
  }

  getChangeInputValue = (text) => {
    const { searchChangeInputValueAction: handleAction } = this.props;
    handleAction(text);
  }

  render() {
    const {
      filters,
      totalCards,
      cardsData,
      navTopItemActive,
      photolistingRequestError,
    } = this.props;
    const { cards } = this.state;

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
  cardsPhotosRequestAction: PropTypes.func,
  paginationChangeAction: PropTypes.func,
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
  isListingLoading: PropTypes.bool,
  photolistingRequestError: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({
      tag: PropTypes.string,
    }),
  }),
};
Home.defaultProps = {
  handleСardsPhotosAction: () => {},
  cardsPhotosRequestAction: () => {},
  paginationChangeAction: () => {},
  filterItemValueAction: () => {},
  searchTextAction: () => {},
  searchChangeInputValueAction: () => {},
  filters: [],
  isListingLoading: false,
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
};
