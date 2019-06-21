import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Pagination } from 'antd';
import { userLikesRequestAction, userPhotoListingRequestAction } from '../../actions';
import { Spinner, PhotoCard, Error } from '../../components';
import './index.css';

class SmallPhotoListingHOC extends PureComponent {
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
    console.log("1: ", this.props)
    return (
      <div className="small-photo-listing">
        3333
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  const { userlikesphotos, userphotolisting } = state;
  return { ...userlikesphotos, ...userphotolisting };
};

const mapDispatchToProps = ({
  userLikesRequestAction,
  userPhotoListingRequestAction,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SmallPhotoListingHOC);
