import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-component';
import { Pagination } from 'antd';
import { smallPhotoListingRequestAction } from '../../actions';
import { Spinner, Error } from '..';
import './index.scss';

export class SmallPhotoListing extends PureComponent {
  componentDidMount = () => {
    const {
      userId,
      page,
      perPage,
      name,
      itemNum,
      smallPhotoListingRequestAction: requestAction,
    } = this.props;
    requestAction(userId, page, perPage, name, itemNum);
  };

  handlePaginationChange = (current) => {
    const {
      userId,
      perPage,
      smallPhotoListingRequestAction: requestAction,
      name,
      itemNum,
    } = this.props;

    requestAction(userId, current, perPage, name, itemNum);
  };

  render() {
    const {
      isSmallPhotoListingFetching,
      totalCards,
      page,
      perPage,
      cards,
      requestError,
    } = this.props;
    const childElements = cards.map(item => (
      <li
        data-test="smallPhotoListingListItem"
        className="small-photo-listing-list__item"
        key={item.photoID}
      >
        <Link
          data-test="smallPhotoListingListLinkPhotoRouter"
          className="small-photo-listing-list__link-photo"
          to={`/photo/${item.photoID}`}
        >
          <img
            data-test="smallPhotoListingListPhoto"
            className="small-photo-listing-list__photo"
            alt="example"
            src={item.photoUrl}
          />
        </Link>
      </li>
    ));
    return (
      <div
        data-test="smallPhotoListingContainer"
        className="small-photo-listing-container"
      >
        { isSmallPhotoListingFetching && (
          <Spinner
            data-test="spinner"
          />
        )}
        { !isSmallPhotoListingFetching && !requestError && (
        <div
          data-test="smallPhotoListing"
          className="small-photo-listing"
        >
          <Masonry
            data-test="smallPhotoListingList"
            className="small-photo-listing-list"
            elementType="ul"
            disableImagesLoaded={false}
            updateOnEachImageLoad={false}
          >
            {childElements}
          </Masonry>
          <div
            data-test="paginationContainer"
            className="small-photo-listing__pagination"
          >
            {totalCards > perPage && (
              <Pagination
                data-test="pagination"
                className="ml-3 mb-5"
                onChange={this.handlePaginationChange}
                hideOnSinglePage
                current={page}
                defaultCurrent={1}
                total={totalCards}
                pageSize={6}
              />
            )}
          </div>
        </div>
        )}
        { !isSmallPhotoListingFetching && requestError && (
        <Error
          data-test="error"
          smallErrorFlag
          text="Sorry, an error occurred during the request. Try again later."
        />
        )}
      </div>
    );
  }
}

SmallPhotoListing.propTypes = {
  isSmallPhotoListingFetching: PropTypes.bool,
  cards: PropTypes.arrayOf(PropTypes.shape({})),
  itemNum: PropTypes.number,
  totalCards: PropTypes.number,
  page: PropTypes.number,
  perPage: PropTypes.number,
  name: PropTypes.string,
  smallPhotoListingRequestAction: PropTypes.func,
  requestError: PropTypes.bool,
  history: PropTypes.shape({
    prop: PropTypes.string,
  }),
  userId: PropTypes.string,
};
SmallPhotoListing.defaultProps = {
  isSmallPhotoListingFetching: true,
  cards: [],
  itemNum: 0,
  totalCards: 10,
  page: 1,
  perPage: 6,
  name: 'photos',
  smallPhotoListingRequestAction: () => {},
  requestError: false,
  history: {},
  userId: '',
};
const mapStateToProps = (state, props) => {
  return state.smallphotolisting[props.itemNum];
};

const mapDispatchToProps = ({
  smallPhotoListingRequestAction,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SmallPhotoListing);
