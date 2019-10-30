import React, { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button,
  Icon,
} from 'antd';
import {
  photoLike,
  photoUnlike,
} from '../../actions';
import './index.scss';

const LikesButton = memo(({ photoID }) => {
  const [like, setLike] = useState(false);
  const dispatch = useDispatch();

  const likePhoto = () => {
    dispatch(photoLike(photoID));
    window.localStorage.setItem(photoID, true);
  };
  const unlikePhoto = () => {
    dispatch(photoUnlike(photoID));
    window.localStorage.removeItem(photoID);
  };

  const isPhotoID = window.localStorage.getItem(photoID);
  if (isPhotoID && !like) setLike(true);

  const getContent = (
    likeBool,
    likesPhoto,
    colorBtn,
    colorIcon,
  ) => (
    <Button
      data-test="likesButton"
      className="likes-button__btn"
      onClick={() => {
        setLike(likeBool);
        likesPhoto();
      }}
      style={{ backgroundColor: colorBtn }}
    >
      <Icon
        className="likes-button__icon"
        type="heart"
        theme="filled"
        style={{ color: colorIcon }}
      />
    </Button>
  );
  return (
    <div
      data-test="likesButtonContainer"
      className="likes-button"
    >
      { like && getContent(false, unlikePhoto, 'red', '#fff') }
      { !like && getContent(true, likePhoto, '#fff', 'red') }
    </div>
  );
});

LikesButton.propTypes = {
  photoID: PropTypes.string,
};

LikesButton.defaultProps = {
  photoID: '',
};

export default LikesButton;
