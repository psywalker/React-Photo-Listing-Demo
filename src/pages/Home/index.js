import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Pagination } from 'antd';
import {
  cardsPhotosRequestAction,
  paginationChangeAction,
  filterItemValueAction,
  searchTextAction,
  searchChangeInputValueAction,
} from '../../actions';
import {
  Search,
  PhotoCard,
  NavTop,
  Spinner,
  Error,
} from '../../components';
import 'antd/dist/antd.css';
import './index.scss';

export class Home extends PureComponent {
  componentDidUpdate = (prevProps) => {
    const { cardsData, cardsPhotosRequestAction: handleAction } = this.props;
    if (prevProps.cardsData !== cardsData) handleAction(cardsData);
  };

  componentDidMount = () => {
    const { match: { params: { tag } }, searchTextAction: handleAction } = this.props;
    if (tag) handleAction(tag, 'tags');
    else this.getCardsPhotos();
  };

  getCardsPhotos = () => {
    const { cardsData, cardsPhotosRequestAction: handleAction } = this.props;
    handleAction(cardsData);
  };

  getPaginationChange = (currentPage) => {
    const { paginationChangeAction: handleAction } = this.props;
    handleAction(currentPage);
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
      isListingLoading,
      cards,
      totalCards,
      cardsData,
      navTopItemActive,
      photolistingRequestError,
    } = this.props;
    if (photolistingRequestError) return <div className="error-text">Error loading photolisting</div>;
    return (
      <div className="App">
        { isListingLoading && (<Spinner className="spinner" />)}

        <Search
          onSearchInputValue={this.getSearchText}
          onChangeInputValue={this.getChangeInputValue}
          queryText={cardsData.query}
        />

        <ul className="nav-top">
          {filters.map(item => (
            <li
              key={item.id}
              className={`nav-top__item ${item.border ? 'nav-top__item_border-right' : ''}`}
            >
              <NavTop
                navTopItemActive={navTopItemActive}
                itemId={item.id}
                onFilterItemValue={this.getFilterItemValue}
                key={item.id}
                label={item.label}
                filterValue={item.filterValue}
              />
            </li>
          ))}
        </ul>

        {!isListingLoading && (
          <ul className="photo-list">
            {
            cards.map(item => (
              <li
                key={item.photoID}
                className="photo-list__item"
              >
                <PhotoCard
                  photoName={item.photoName}
                  photoDesc={item.photoDesc}
                  title={item.title}
                  tags={item.tags}
                  photoID={item.photoID}
                  userID={item.userID}
                  userAvatar={item.userAvatar}
                  onSearchTagValue={this.getSearchText}
                />
              </li>
            ))}
          </ul>
        )}
        {!totalCards && (
          <div className="cards__text-empty">
            <Error
              text="No images were found for your request. Try to find more."
            />
          </div>
        )}

        <div className="pagination">
          {totalCards > cardsData.per_page && (
            <Pagination
              showSizeChanger
              hideOnSinglePage
              onChange={this.getPaginationChange}
              current={cardsData.page}
              defaultCurrent={1}
              total={totalCards}
            />
          )}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
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
    prop: PropTypes.string,
  }),
};
Home.defaultProps = {
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
  totalCards: 10,
  navTopItemActive: 2,
  photolistingRequestError: false,
  match: {},
};

const mapStateToProps = (state) => {
  const { photolisting } = state;
  return photolisting;
};

const mapDispatchToProps = ({
  cardsPhotosRequestAction,
  paginationChangeAction,
  filterItemValueAction,
  searchTextAction,
  searchChangeInputValueAction,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
