import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import { Spinner } from '../../components';
import { photoRequestAction, photoImageLoadAction } from '../../actions';
import './photo.css';

const { Meta } = Card;

class Photo extends Component {

  componentDidMount = () => {
    const { match, photoRequestAction: requestAction } = this.props;
    requestAction(match);
  };

  photoLoad = () => {
    const { photoImageLoadAction: photoLoadAction } = this.props;
    photoLoadAction();
  }

  render() {
    const {
      isPhotoLoading,
      photoSrc,
      userPortfolioUrl,
      userNic,
      photoDesc,
      requestError,
      isSuccessPhotoRequest,
    } = this.props;
    return (
      <div className="photo-container photo">
        { (isPhotoLoading || isSuccessPhotoRequest) && (<Spinner className="spinner" />)}
        { !isSuccessPhotoRequest && !requestError && (
          <Card
            style={{ width: '100%', opacity: isPhotoLoading ? 0 : 1 }}
            cover={(
              <img
                className="photo__img"
                alt="example"
                src={photoSrc}
                onLoad={this.photoLoad}
              />
            )}
          >
            <Meta className="photo__desc" title={`${photoDesc || 'No title'}`} />
            <Link to={`/users/${userNic}`}>
              <p className="photo__autor-page-link">
                { 'Autor\'s page link' }
              </p>
            </Link>
            <a className="photo__autor-link" href={userPortfolioUrl}>{ 'Autor\'s portfolio link' }</a>
          </Card>
        )}
        { !isPhotoLoading && !isSuccessPhotoRequest && requestError && (
          <p>
            Такое фото не найдено.
            {' '}
            <Link to="/">
              Перейти на главную.
            </Link>
          </p>
        )}
      </div>
    );
  }
}

Photo.propTypes = {
  photoRequestAction: PropTypes.func,
  photoImageLoadAction: PropTypes.func,
  isPhotoLoading: PropTypes.bool,
  isSuccessPhotoRequest: PropTypes.bool,
  photoSrc: PropTypes.string,
  userPortfolioUrl: PropTypes.string,
  userNic: PropTypes.string,
  photoDesc: PropTypes.string,
  requestError: PropTypes.bool,
  match: PropTypes.shape({
    prop: PropTypes.string,
  }),
  history: PropTypes.shape({
    prop: PropTypes.string,
  }),
};
Photo.defaultProps = {
  photoImageLoadAction: () => {},
  photoRequestAction: () => {},
  isPhotoLoading: true,
  isSuccessPhotoRequest: true,
  photoSrc: null,
  userNic: 'UserNic',
  userPortfolioUrl: '',
  photoDesc: '',
  requestError: false,
  match: {},
  history: {},
};

const mapStateToProps = (state) => {
  const { photo } = state;
  return photo;
};

const mapDispatchToProps = ({
  photoRequestAction,
  photoImageLoadAction,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Photo);
