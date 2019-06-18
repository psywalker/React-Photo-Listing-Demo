import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Pagination } from 'antd';
import { userLikesRequestAction } from '../../actions';
import { Spinner, PhotoCard } from '../../components';
import './index.css';

class UserLikesPhotos extends PureComponent {

  componentDidMount = () => {
    const {
      userId,
      page,
      perPage,
      userLikesRequestAction: requestAction,
    } = this.props;

    requestAction(userId, page, perPage);
  };

  handlePaginationChange = (current) => {
    const {
      userId,
      perPage,
      userLikesRequestAction: requestAction,
    } = this.props;

    requestAction(userId, current, perPage);
  };

  render() {
    const {
      isUserLikesFetching,
      cards,
      totalCards,
      page,
      perPage,
    } = this.props;

    return (
      <div>
        { isUserLikesFetching && (<Spinner />)}
        <div>
          <Row justify="center" style={{ margin: '20px 0' }}>
            <Col span={24}>
              {!isUserLikesFetching && (
                <ul className="photo-list user-photos">
                  {cards.map(item => (
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
            <Col style={{
              display: 'flex',
              justifyContent: 'center',
            }}
            >
              {totalCards > perPage && (
                <Pagination
                  className="ml-3 mb-5"
                  onChange={this.handlePaginationChange}
                  showSizeChanger
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
      </div>
    );
  }
}

UserLikesPhotos.propTypes = {
  isUserLikesFetching: PropTypes.bool,
  cards: PropTypes.arrayOf(PropTypes.shape({})),
  totalCards: PropTypes.number,
  page: PropTypes.number,
  perPage: PropTypes.number,
  userLikesRequestAction: PropTypes.func,
  history: PropTypes.shape({
    prop: PropTypes.string,
  }),
  userId: PropTypes.string,
};
UserLikesPhotos.defaultProps = {
  isUserLikesFetching: true,
  cards: [],
  totalCards: 10,
  page: 1,
  perPage: 6,
  userLikesRequestAction: () => {},
  history: {},
  userId: '',
};
const mapStateToProps = (state) => {
  const { userlikesphotos } = state;
  return userlikesphotos;
};

const mapDispatchToProps = ({
  userLikesRequestAction,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserLikesPhotos);
