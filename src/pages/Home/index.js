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
    navTopItemActiveDefault: 2,
    queryTextDefault: 'wallpapers',
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

    const { cards: cardsState, queryTextDefault } = this.state;
    const { cards: cardsProps } = this.props;

    if (prevProps.cards !== cardsProps) {
      const arr = [...cardsState, ...cardsProps];
      this.setState({ cards: arr });
    } else if (prevProps.cardsData !== cardsData && !isListingLoading) {
      handleСardsPhotosAction({
        ...cardsData,
        page: 1,
      });
      this.setState({ page: 1, cards: [] });
    } else if (state && state.flag && cardsData.query !== queryTextDefault && !isListingLoading) {
      push('', {});
      this.setState({ page: 1, cards: [] }, () => {
        handleAction(queryTextDefault, 'tags');
      });
    }
  };

  componentDidMount = () => {
    const { match: { params: { tag } }, searchTextAction: handleAction } = this.props;
    const ulrStringArr = window.location.href.split('=')[1];
    if (tag) handleAction(tag, 'tags');
    else if (ulrStringArr) handleAction(ulrStringArr, 'tags');
    else this.getCardsPhotos();
  };

  getDataSearch = () => {
    const { cardsData, filters } = this.props;
    const { queryTextDefault, navTopItemActiveDefault } = this.state;
    const ulrStringArr = window.location.href.split('=')[1];
    let queryText = queryTextDefault;
    let navTopItemActive = navTopItemActiveDefault;

    if (ulrStringArr) {
      navTopItemActive = filters.filter((item) => {
        let flag = false;
        const labelArr = item.label.split(' ');
        labelArr.map((key) => {
          if (key.toLowerCase() === ulrStringArr.toLowerCase()) flag = true;
          return key;
        });
        return flag;
      });

      navTopItemActive = navTopItemActive.length ? navTopItemActive[0].id : null;
      queryText = cardsData.query;
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
      filters,
      totalCards,
      photolistingRequestError,
      errorRateLimit = '',
    } = this.props;
    const { cards } = this.state;
    const isErrorRateLimit = errorRateLimit === 'Rate Limit Exceeded';
    const dataSearch = this.getDataSearch();

    if (isErrorRateLimit) return <div className="error-text" data-test="errorText">Вы привысили количество скачиваний за час. Попробуйте позже.</div>;
    if (photolistingRequestError) return <div className="error-text" data-test="errorText">Error loading photolisting</div>;

    return (
      <div className="App">

        <Search
          data-test="search"
          onSearchInputValue={this.getSearchText}
          onChangeInputValue={this.getChangeInputValue}
          queryText={dataSearch.queryText}
        />

        <NavTop
          data-test="navTop"
          navTopItemActive={dataSearch.navTopItemActive}
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
