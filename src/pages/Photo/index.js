import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Button, Icon } from 'antd';
import { SpinnerPhoto } from '../../components';
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
      info: {
        views,
        downloads,
        likes,
        cameraMake,
        focalLength,
        aperture,
        shutterspeed,
        iso,
        cameraModel,
        width,
        height,
      },
      userName,
      twitterName,
      photoProfile,
      tags,
      altDescriprion,
      photoSrc,
      photoDesc,
      isPhotoLoading,
      requestError,
      isSuccessPhotoRequest,
    } = this.props;
    return (
      <div className="photo-container photo" id="photo-container">
        { !isSuccessPhotoRequest && !requestError && (

          <Card
            title={(
              <div className="photo__twitter photo-twitter">
                <img
                  src={photoProfile}
                  alt=""
                  className="photo-twitter__ava"
                />
                <div className="photo-twitter__content">
                  <Link to={`/users/${userName}`}>
                    <p className="photo-twitter__user-name">{userName}</p>
                    <p className="photo-twitter__twitter-name">
                      @
                      {twitterName}
                    </p>
                  </Link>
                </div>
              </div>
            )}
            extra={(
              <div className="photo-header">
                <Button
                  style={{ marginLeft: '10px' }}
                  href="#"
                >
                  Download
                </Button>
              </div>
            )}
            style={{ width: '100%', height: '100%', padding: 0 }}
            bodyStyle={{ padding: 0 }}
            headStyle={{ padding: '0 10px' }}
          >
            <div className="photo__content photo-content">
              <img
                className="photo-content__img"
                alt="example"
                src={photoSrc}
                onLoad={this.photoLoad}
              />
              <div className="photo-content__body">
                <Button
                  style={{ marginLeft: '10px' }}
                  href="#"
                >
                  <Icon type="info-circle" />
                  Info
                </Button>
                <Button
                  style={{ marginLeft: '10px' }}
                  href="#"
                >
                  <Icon type="share-alt" />
                  Share
                </Button>
              </div>
            </div>
          </Card>
          // <Card
          //   cover={(
          //     <div className="photo__changed">
          //       <div
          //         className="photo__spinner-wrap"
          //         style={{ display: isPhotoLoading ? 'block' : 'none' }}
          //       >
          //         <SpinnerPhoto className="spinner-photo" />
          //       </div>

          //       <img
          //         className="photo__img"
          //         alt="example"
          //         src={photoSrc}
          //         onLoad={this.photoLoad}
          //       />
          //     </div>
          //   )}
          // >
          //   <Meta className="photo__desc" title={`${photoDesc || 'No title'}`} />
          //   <Link to={`/users/${userName}`}>
          //     <p className="photo__autor-page-link">
          //       { 'Autor\'s page link' }
          //     </p>
          //   </Link>
          // </Card>
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
  info: PropTypes.shape({
    views: PropTypes.number,
    downloads: PropTypes.number,
    likes: PropTypes.number,
    cameraMake: PropTypes.string,
    focalLength: PropTypes.string,
    aperture: PropTypes.string,
    shutterspeed: PropTypes.string,
    iso: PropTypes.number,
    cameraModel: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  userName: PropTypes.string,
  twitterName: PropTypes.string,
  photoProfile: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
  })),
  altDescriprion: PropTypes.string,
  photoSrc: PropTypes.string,
  photoDesc: PropTypes.string,
  photoRequestAction: PropTypes.func,
  photoImageLoadAction: PropTypes.func,
  isPhotoLoading: PropTypes.bool,
  isSuccessPhotoRequest: PropTypes.bool,
  requestError: PropTypes.bool,
  match: PropTypes.shape({
    prop: PropTypes.string,
  }),
  history: PropTypes.shape({
    prop: PropTypes.string,
  }),
};
Photo.defaultProps = {
  info: {
    views: 0,
    downloads: 0,
    likes: 0,
    cameraMake: '',
    focalLength: '',
    aperture: '',
    shutterspeed: '',
    iso: 0,
    cameraModel: '',
    width: 0,
    height: 0,
  },
  userName: '',
  twitterName: '',
  photoProfile: '',
  tags: [],
  altDescriprion: '',
  photoSrc: '',
  photoDesc: '',
  photoImageLoadAction: () => {},
  photoRequestAction: () => {},
  isPhotoLoading: true,
  isSuccessPhotoRequest: true,
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
