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

  const getPhotoID = window.localStorage.getItem(photoID);
  if (getPhotoID && !like) setLike(true);
  return (
    <div
      data-test="likesButtonContainer"
      className="likes-button"
    >
      { !like && (
        <div className="likes-button__off">
          <Button
            data-test="likesButton"
            className="likes-button__btn"
            onClick={() => {
              setLike(true);
              likePhoto();
            }}
            style={{ backgroundColor: '#fff' }}
          >
            <Icon
              data-test="likesButtonIcon"
              className="likes-button__icon"
              type="heart"
              theme="filled"
              style={{ color: 'red' }}
            />
          </Button>
        </div>
      )}

      { like && (
        <div className="likes-button__on">
          <Button
            data-test="likesButton"
            className="likes-button__btn"
            onClick={() => {
              setLike(false);
              unlikePhoto();
            }}
            style={{ backgroundColor: 'red' }}
          >
            <Icon
              data-test="likesButtonIcon"
              className="likes-button__icon"
              type="heart"
              theme="filled"
              style={{ color: '#fff' }}
            />
          </Button>
        </div>
      )}
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
