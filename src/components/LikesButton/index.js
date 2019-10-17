import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Icon,
} from 'antd';

import './index.scss';

const LikesButton = memo(() => {
  const [like, setLike] = useState(false);

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
            onClick={() => setLike(true)}
            style={{ backgroundColor: '#fff' }}
          >
            <Icon
              data-test="likesButtonIcon"
              className="likes-button__icon"
              type="heart"
              theme="filled"
              filledColor="red"
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
            onClick={() => setLike(false)}
            style={{ backgroundColor: 'red' }}
          >
            <Icon
              data-test="likesButtonIcon"
              className="likes-button__icon"
              type="heart"
              theme="filled"
              filledColor="#fff"
              style={{ color: '#fff' }}
            />
          </Button>
        </div>
      )}
    </div>
  );
});

LikesButton.propTypes = {

};
LikesButton.defaultProps = {

};

export default LikesButton;
