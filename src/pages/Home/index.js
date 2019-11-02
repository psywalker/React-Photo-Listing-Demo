import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import PhotoCardList from '../../components/PhotoCardList';
import { QUERY_TEXT_DEFAULT } from '../../constants';
import getURLParam from '../../utils/getURLParam';
import setScrollX from '../../utils/setScrollX';
import 'antd/dist/antd.css';
import './index.scss';

export default class Home extends PureComponent {
  state = {
    page: 1,
    cards: [],
  };

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

    if (
      state
      && state.flag
      && cardsData.query !== QUERY_TEXT_DEFAULT
      && !isListingLoading
    ) {
      push('', {});
      this.setState({ page: 1, cards: [] }, () => {
        handleAction(QUERY_TEXT_DEFAULT, 'tags');
      });
    }

    return false;
  };

  componentDidMount = () => {
    const {
      match: {
        params: { tag },
      },
      searchTextAction: handleAction,
    } = this.props;
    const tagName = getURLParam(window.location, 'search');
    if (tag) return handleAction(tag, 'tags');
    if (tagName) return handleAction(tagName, 'tags');
    return this.getCardsPhotos();
  };

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

  getSearchText = (text, tags) => {
    const { searchTextAction: handleAction } = this.props;
    handleAction(text, tags);
    this.handleUrl(text);
  };

  render() {
    const {
      totalCards,
      photolistingRequestError,
      errorRateLimit = '',
      t,
    } = this.props;
    const { cards } = this.state;
    const isErrorRateLimit = errorRateLimit === 'Rate Limit Exceeded';
    setScrollX(totalCards);
    if (isErrorRateLimit) {
      return (
        <div className="error-text" data-test="errorText">
          {t('errors.increasedNumberDownloads')}
        </div>
      );
    }
    if (photolistingRequestError) {
      return (
        <div className="error-text" data-test="errorText">
          {t('errors.errorLoadingPhotolisting')}
        </div>
      );
    }

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
          {t('errors.imagesNotFound')}
        </div>
        )}
      </div>
    );
  }
}

Home.propTypes = {
  handleСardsPhotosAction: PropTypes.func,
  searchTextAction: PropTypes.func,
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
  searchTextAction: () => {},
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
