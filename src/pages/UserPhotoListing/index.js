import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Pagination } from 'antd';
import { connect } from 'react-redux';
import { Spinner, PhotoCard, Error } from '../../components';
import { userPhotoListingRequestAction } from '../../actions';
import './index.css';

class UserPhotoListing extends PureComponent {
  componentDidMount = () => {
    const {
      userId,
      page,
      perPage,
      userPhotoListingRequestAction: requestAction,
    } = this.props;

    requestAction(userId, page, perPage);
  };

  handlePaginationChange = (current) => {
    const {
      userId,
      perPage,
      userPhotoListingRequestAction: requestAction,
    } = this.props;

    requestAction(userId, current, perPage);
  };

  render() {
    const {
      isUserPhotoListingFetching,
      cards,
      totalCards,
      page,
      perPage,
      requestError,
    } = this.props;
    return (
      <div>
        { isUserPhotoListingFetching && (<Spinner className="spinner" />)}
        { !isUserPhotoListingFetching && !requestError && (
        <div>
          <Row
            justify="center"
            style={{ margin: '20px 0' }}
          >
            <Col span={24}>
              {!isUserPhotoListingFetching && (
                <ul className="photo-list user-photos ">
                  {
                    cards.map(item => (
                      <li
                        key={item.photoID}
                        className="photo-list__item pl-3"
                      >
                        <PhotoCard
                          photoName={item.photoName}
                          title={item.title}
                          tags={item.tags}
                          photoID={item.photoID}
                          userID={item.userID}
                          userAvatar={item.userAvatar}
                          onSearchTagValue={this.handleSearchText}
                        />
                      </li>
                    ))
                  }
                </ul>
              )}
            </Col>
          </Row>
          <Row
            justify="center"
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Col
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {totalCards > perPage && (
                <Pagination
                  className="ml-3 mb-5"
                  onChange={this.handlePaginationChange}
                  hideOnSinglePage
                  current={page}
                  defaultCurrent={1}
                  total={totalCards}
                  pageSize={6}
                />
              )}
            </Col>
          </Row>
        </div>
        )}
        { !isUserPhotoListingFetching && requestError && (
        <Error text="Sorry, an error occurred during the request. Try again later." />
        )}
      </div>
    );
  }
}

UserPhotoListing.propTypes = {
  isUserPhotoListingFetching: PropTypes.bool,
  cards: PropTypes.arrayOf(PropTypes.shape({})),
  totalCards: PropTypes.number,
  page: PropTypes.number,
  perPage: PropTypes.number,
  userPhotoListingRequestAction: PropTypes.func,
  requestError: PropTypes.bool,
  history: PropTypes.shape({
    prop: PropTypes.string,
  }),
  userId: PropTypes.string,
};
UserPhotoListing.defaultProps = {
  isUserPhotoListingFetching: true,
  cards: [],
  totalCards: 10,
  page: 1,
  perPage: 6,
  userPhotoListingRequestAction: () => {},
  requestError: false,
  history: {},
  userId: '',
};
const mapStateToProps = (state) => {
  const { userphotolisting } = state;
  return userphotolisting;
};

const mapDispatchToProps = ({
  userPhotoListingRequestAction,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserPhotoListing);
