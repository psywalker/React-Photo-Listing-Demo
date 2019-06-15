import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Card,
  Button,
  Icon,
  Tag,
  Popover,
} from 'antd';
import { SpinnerPhoto } from '../../components';
import { photoRequestAction, photoImageLoadAction } from '../../actions';
import getPhotoSize from './getPhotoSize';
import './index.scss';

class Photo extends Component {
  state = {
    photoWidth: null,
    photoHeight: null,
  }

  componentDidMount = () => {
    const { match, photoRequestAction: requestAction } = this.props;
    requestAction(match);
    this.setPhotoSize();
    window.addEventListener('resize', this.setPhotoSize);
  };

  componentDidUpdate = (prevProps) => {
    const { widthPhoto } = this.props;
    if (prevProps.widthPhoto !== widthPhoto) this.setPhotoSize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setPhotoSize);
  }

  setPhotoSize = () => {
    const photoSize = getPhotoSize(this.props);
    this.setState({ photoWidth: photoSize.photoWidth, photoHeight: photoSize.photoHeight });
  }

  render() {
    const { photoWidth, photoHeight } = this.state;
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
      },
      userFirstName,
      userLastName,
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
      photoImageLoadAction: photoLoadAction,
    } = this.props;

    const photoSize = { width: photoWidth, height: photoHeight };
    return (
      <div className="photo-container photo" id="photo-container">
        { !isSuccessPhotoRequest && !requestError && (
          <Card
            title={(
              <Link to={`/users/${userName}`}>
                <div className="photo__twitter photo-twitter">
                  <img
                    src={photoProfile}
                    alt="Avatar"
                    className="photo-twitter__ava"

                  />
                  <div className="photo-twitter__content">
                    <p className="photo-twitter__user-name">{`${userFirstName} ${userLastName}`}</p>
                    <p className="photo-twitter__twitter-name">
                      @
                      {twitterName}
                    </p>
                  </div>
                </div>
              </Link>
            )}
            extra={(
              <div className="photo-header">
                <Button
                  style={{ marginLeft: '10px' }}
                  href="#"
                >
                  <Icon type="download" />
                  Download
                </Button>
              </div>
            )}
            style={{ width: '100%', height: '100%', padding: 0 }}
            bodyStyle={{ padding: 0 }}
            headStyle={{ padding: '0 10px' }}
          >
            <div className="photo__content photo-content">
              { isPhotoLoading && <SpinnerPhoto /> }
              <img
                className="photo-content__photo"
                alt={altDescriprion}
                src={photoSrc}
                style={photoSize}
                onLoad={photoLoadAction}
              />
              <div className="photo-content__footer photo-footer">
                <div className="photo-footer__tags">
                  { tags.length > 2 && (
                    <Popover
                      placement="top"
                      title="All tags"
                      content={(
                        <div>
                          {tags.map((item, i) => {
                            if (i > 2) {
                              return (
                                <Link to={`/${item.title}`} key={item.title}>
                                  <Tag key={item.title}>
                                    {item.title}
                                  </Tag>
                                </Link>
                              );
                            }
                            return null;
                          })}
                        </div>
                      )}
                      trigger="click"
                    >
                      <Button
                        style={{ marginLeft: '10px' }}
                        href="#"
                      >
                        <Icon type="tag" />
                        Show all tags
                      </Button>
                    </Popover>
                  )}
                </div>
                <div className="photo-footer__btns">
                  <Button
                    style={{ marginLeft: '10px' }}
                    href="#"
                  >
                    <Icon type="share-alt" />
                    Share
                  </Button>
                  <Button
                    style={{ marginLeft: '10px' }}
                    href="#"
                  >
                    <Icon type="info-circle" />
                    Info
                  </Button>
                </div>
              </div>
            </div>
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
  }),
  userFirstName: PropTypes.string,
  userLastName: PropTypes.string,
  userName: PropTypes.string,
  twitterName: PropTypes.string,
  photoProfile: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
  })),
  altDescriprion: PropTypes.string,
  photoSrc: PropTypes.string,
  photoDesc: PropTypes.string,
  widthPhoto: PropTypes.number,
  heightPhoto: PropTypes.number,
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
  userFirstName: '',
  userLastName: '',
  userName: '',
  twitterName: '',
  photoProfile: '',
  tags: [],
  altDescriprion: '',
  photoSrc: '',
  photoDesc: '',
  widthPhoto: 300,
  heightPhoto: 300,
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
