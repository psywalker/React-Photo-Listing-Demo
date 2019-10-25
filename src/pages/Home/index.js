import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import PhotoCardList from '../../components/PhotoCardList';
import { NAV_TOP_ITEM_ACTIVE_DEFAULT, QUERY_TEXT_DEFAULT } from '../../constants';
import getURLParam from '../../utils/getURLParam';
import setScrollX from '../../utils/setScrollX';
import 'antd/dist/antd.css';
import './index.scss';

export default class Home extends PureComponent {
  state = {
    page: 1,
    cards: [],
  }

  componentDidUpdate = (prevProps) => {
    const {
      cardsData,
      handleСardsPhotosAction,
      location: { state },
      history: { push },
      isListingLoading,
      searchTextAction: handleAction,
    } = this.props;

    const { cards: cardsState } = this.state;
    const { cards: cardsProps } = this.props;

    if (prevProps.cards !== cardsProps) {
      const arr = [...cardsState, ...cardsProps];
      return this.setState({ cards: arr });
    }

    if (prevProps.cardsData !== cardsData && !isListingLoading) {
      handleСardsPhotosAction({ ...cardsData, page: 1 });
      return this.setState({ page: 1, cards: [] });
    }

    if (state && state.flag && cardsData.query !== QUERY_TEXT_DEFAULT && !isListingLoading) {
      push('', {});
      this.setState({ page: 1, cards: [] }, () => {
        handleAction(QUERY_TEXT_DEFAULT, 'tags');
      });
    }

    return false;
  };

  componentDidMount = () => {
    const { match: { params: { tag } }, searchTextAction: handleAction } = this.props;
    const tagName = getURLParam(window.location, 'search');
    if (tag) return handleAction(tag, 'tags');
    if (tagName) return handleAction(tagName, 'tags');
    return this.getCardsPhotos();
  };

  getDataSearch = () => {
    const { cardsData, filters } = this.props;
    const cardsDataQuery = cardsData.query;
    const tagName = getURLParam(window.location, 'search');
    let queryText = QUERY_TEXT_DEFAULT;
    let navTopItemActive = NAV_TOP_ITEM_ACTIVE_DEFAULT;

    if (tagName) {
      const tag = filters.filter(item => item.label.toLowerCase() === tagName);
      navTopItemActive = tag.length ? tag[0].id : null;
      queryText = cardsDataQuery;
    }

    return {
      queryText,
      navTopItemActive,
    };
  }

  handleUrl = (str) => {
    const { history: { push } } = this.props;
    const newUrl = `?search=${str}`;
    push(newUrl, {});
  }

  getCardsPhotos = () => {
    const { cardsData, handleСardsPhotosAction } = this.props;
    handleСardsPhotosAction(cardsData);
  };

  getPaginationChange = () => {
    const { handleСardsPhotosAction, cardsData, isListingLoading } = this.props;
    const { page } = this.state;
    if (!isListingLoading) {
      handleСardsPhotosAction({
        ...cardsData,
        page: page + 1,
      });
      this.setState({ page: page + 1 });
    }
  };

  getFilterItemValue = (itemText, itemId) => {
    const { filterItemValueAction: handleAction } = this.props;
    handleAction(itemText, itemId);
    this.handleUrl(itemText);
  };

  getSearchText = (text, tags) => {
    const { searchTextAction: handleAction } = this.props;
    handleAction(text, tags);
    this.handleUrl(text);
  }

  getChangeInputValue = (text) => {
    const { searchChangeInputValueAction: handleAction } = this.props;
    handleAction(text);
    this.handleUrl(text);
  }

  render() {
    const {
      totalCards,
      photolistingRequestError,
      errorRateLimit = '',
    } = this.props;
    const { cards } = this.state;
    const isErrorRateLimit = errorRateLimit === 'Rate Limit Exceeded';
    setScrollX(totalCards);
    if (isErrorRateLimit) return <div className="error-text" data-test="errorText">You have increased the number of downloads per hour. Try later.</div>;
    if (photolistingRequestError) return <div className="error-text" data-test="errorText">Error loading photolisting</div>;

    return (
      <div className="App">

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
  cards: PropTypes.arrayOf(PropTypes.object),
  photolistingRequestError: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({
      tag: PropTypes.string,
    }),
  }),
  isListingLoading: PropTypes.bool,
  location: PropTypes.shape({}),
  history: PropTypes.shape({}),
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
  photolistingRequestError: false,
  match: {
    params: {
      tag: '',
    },
  },
  isListingLoading: false,
  location: {},
  history: {},
  errorRateLimit: '',
};
