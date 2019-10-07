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
import ImageZoom from 'react-medium-image-zoom';
import { saveAs } from 'file-saver';
import { SpinnerPhoto, InfoPhotoModal, Error } from '../../components';
import { photoRequestAction, photoImageLoadAction } from '../../actions';
import getPhotoSize from './getPhotoSize';
import handleDowloadPhoto from './handleDowloadPhoto';
import './index.scss';

export class Photo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      photoWidth: null,
      photoHeight: null,
    };
    this.photoContainer = React.createRef();
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

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.setPhotoSize);
  }

  downLoadPhoto = () => {
    const { info: { photoDesc }, altDescriprion, photoSrc } = this.props;
    const photoName = handleDowloadPhoto(altDescriprion, photoDesc);
    saveAs(photoSrc, photoName);
  }

  setPhotoSize = () => {
    const photoContainerWidth = this.photoContainer.current.offsetWidth;
    const windowHeight = window.document.documentElement.clientHeight;
    const photoSize = getPhotoSize(this.props, photoContainerWidth, windowHeight);
    this.setState({
      photoWidth: photoSize.photoWidth,
      photoHeight: photoSize.photoHeight,
    });
  }

  render() {
    const { photoWidth, photoHeight } = this.state;
    const {
      info,
      userFirstName,
      userLastName,
      userName,
      twitterName,
      photoProfile,
      tags,
      altDescriprion,
      photoSrc,
      isPhotoLoading,
      requestError,
      isSuccessPhotoRequest,
      photoImageLoadAction: photoLoadAction,
    } = this.props;
    const photoSize = { width: photoWidth, height: photoHeight };
  
    return (
      <div
        data-test="photoContainer"
        className="photo-container photo"
        id="photo-container"
        ref={this.photoContainer}
      >
        { !isSuccessPhotoRequest && !requestError && (
          <Card
            data-test="photoCard"
            title={(
              <Link
                data-test="photoTwitterLinkRouter"
                to={`/users/${userName}`}
              >
                <div
                  data-test="photoTwitter"
                  className="photo__twitter photo-twitter"
                >
                  <img
                    data-test="photoTwitterAvatar"
                    src={photoProfile}
                    alt="Avatar"
                    className="photo-twitter__ava"

                  />
                  <div
                    data-test="photoTwitterContent"
                    className="photo-twitter__content"
                  >
                    <p
                      data-test="photoTwitterUserName"
                      className="photo-twitter__user-name"
                    >
                      {`${userFirstName} ${userLastName}`}
                    </p>
                    <p
                      data-test="photoTwitterName"
                      className="photo-twitter__twitter-name"
                    >
                      @
                      {twitterName}
                    </p>
                  </div>
                </div>
              </Link>
            )}
            extra={(
              <div
                data-test="photoHeader"
                className="photo-header"
              >
                <Button
                  data-test="photoHeaderButton"
                  style={{ marginLeft: '10px' }}
                  onClick={this.downLoadPhoto}
                >
                  <Icon
                    data-test="photoHeaderButtonIcon"
                    type="download"
                  />
                  Download
                </Button>
              </div>
            )}
            style={{
              width: '100%',
              height: '100%',
              padding: 0,
            }}
            bodyStyle={{ padding: 0 }}
            headStyle={{ padding: '0 10px' }}
          >
            <div
              data-test="photoContent"
              className="photo__content photo-content"
            >
              { isPhotoLoading && <SpinnerPhoto data-test="photoSpinner" /> }
              <ImageZoom
                data-test="photoImageZoom"
                defaultStyles={{
                  overlay: {
                    background: 'rgba(0, 0, 0, .8)',
                  },
                }}
                image={{
                  'data-test': 'photoImageZoomImg',
                  src: photoSrc,
                  alt: altDescriprion,
                  className: 'photo-content__photo',
                  style: photoSize,
                  onLoad: photoLoadAction,
                }}
                zoomImage={{
                  src: photoSrc,
                  alt: altDescriprion,
                }}
              />
              <div
                data-test="photoFooter"
                className="photo-content__footer photo-footer"
              >
                <div
                  data-test="photoFooterTags"
                  className="photo-footer__tags"
                >
                  { tags.length && (
                    <Popover
                      data-test="photoPopover"
                      placement="topLeft"
                      title="All tags"
                      content={(
                        <div>
                          {tags.map(item => (
                            <Link
                              data-test="photoTagLinkRouter"
                              to={`/${item.title}`}
                              key={item.title}
                            >
                              <Tag
                                data-test="photoTag"
                                key={item.title}
                              >
                                {item.title}
                              </Tag>
                            </Link>
                          ))}
                        </div>
                      )}
                      trigger="click"
                    >
                      <Button
                        data-test="photoPopoverButton"
                        style={{ marginLeft: '10px' }}
                        href="#"
                      >
                        <Icon
                          type="tag"
                          data-test="photoPopoverButtonIcon"
                        />
                        Show all tags
                      </Button>
                    </Popover>
                  )}
                </div>
                <div
                  data-test="photoFooterBtns"
                  className="photo-footer__btns"
                >
                  <Button
                    data-test="photoFooterBtnsBtn"
                    style={{ marginLeft: '10px' }}
                    href="#"
                  >
                    <Icon type="share-alt" />
                    Share
                  </Button>
                  <InfoPhotoModal
                    data-test="photoInfoPhotoModal"
                    {...info}
                  />
                </div>
              </div>
            </div>
          </Card>
        )}
        { !isPhotoLoading && !isSuccessPhotoRequest && requestError && (
        <Error
          data-test="photoError"
          text="Sorry, no photo found"
        />
        )}
      </div>
    );
  }
}

Photo.propTypes = {
  info: PropTypes.shape({}),
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
  photoImageLoadAction: () => {},
  photoRequestAction: () => {},
  info: {},
  userFirstName: '',
  userLastName: '',
  userName: '',
  twitterName: '',
  photoProfile: '',
  tags: [],
  altDescriprion: '',
  photoSrc: '',
  widthPhoto: 300,
  heightPhoto: 300,
  isPhotoLoading: true,
  isSuccessPhotoRequest: true,
  requestError: false,
  match: {},
  history: {},
};

export const mapStateToProps = (state) => {
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
