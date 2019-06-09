import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Pagination } from 'antd';
import axios from 'axios';
import { Spinner, PhotoCard } from '../../components';
import { URL_FOR_USER_PHOTO_LISTING_QUERY } from '../../constants/urls';
import './index.css';

class UserPhotoListing extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      isListingLoading: false,
      cards: [],
      totalCards: 10,
      page: 1,
      per_page: 6,
    };
  }

  componentDidMount = () => {
    this.handleUserPhotoListingQuery();
  };

  handlePaginationChange = (current) => {
    this.setState({
      page: current,
      per_page: 6,
    }, this.handleUserPhotoListingQuery);
  };

  handleUserPhotoListingQuery = () => {
    const { history, userId } = this.props;
    const { page, per_page: perPage } = this.state;
    this.setState({ isListingLoading: true });
    const API_URL = URL_FOR_USER_PHOTO_LISTING_QUERY(userId);
    axios.get(API_URL, {
      params: {
        page,
        perPage,
        client_id: process.env.REACT_APP_UNSPLASH_API_KEY,
      },
    }).then((res) => {
      const cards = res.data;
      const totalCards = parseInt(res.headers['x-total'], 10);
      this.setState({
        cards,
        isListingLoading: false,
        totalCards,
      });
    })
      .catch(() => {
        history.push('/');
      });
  }

  render() {
    const {
      isListingLoading,
      cards,
      totalCards,
      page,
      per_page: perPage,
    } = this.state;
    return (
      <div>
        { isListingLoading && (<Spinner className="spinner" />)}
        <div>
          <Row justify="center" style={{ margin: '20px 0' }}>
            <Col span={24}>
              {!isListingLoading && (
                <ul className="photo-list user-photos ">
                  {
                    cards.map(item => (
                      <li key={item.id} className="photo-list__item pl-3">
                        <PhotoCard
                          photoName={item.urls.regular}
                          title=""
                          tags={item.photo_tags}
                          photoID={item.id}
                          userID={item.user.username}
                          userAvatar={item.user.profile_image.small}
                          onSearchTagValue={this.handleSearchText}
                        />
                      </li>
                    ))
                  }
                </ul>
              )}
            </Col>
          </Row>
          <Row justify="center" style={{ display: 'flex', justifyContent: 'center' }}>
            <Col style={{ display: 'flex', justifyContent: 'center' }}>
              {totalCards > perPage && (
                <Pagination
                  className="ml-3 mb-5"
                  onChange={this.handlePaginationChange}
                  showSizeChanger
                  current={page}
                  defaultCurrent={1}
                  total={totalCards}
                />
              )}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

UserPhotoListing.propTypes = {
  history: PropTypes.shape({
    prop: PropTypes.string,
  }),
  userId: PropTypes.string,
};
UserPhotoListing.defaultProps = {
  history: {},
  userId: '',
};
export default UserPhotoListing;
