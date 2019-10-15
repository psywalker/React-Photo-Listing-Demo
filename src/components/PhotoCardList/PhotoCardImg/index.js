import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './index.scss';

const PhotoCardImg = memo(({
  photoID,
  photoAltDesc,
  photoName,
}) => (
  <Link
    data-test="photoCardPhotoLink"
    to={`/photo/${photoID}`}
  >
    <img
      data-test="photoCardImg"
      className="photo-card-img"
      alt={photoAltDesc}
      src={photoName}
    />
  </Link>
));


PhotoCardImg.propTypes = {
  photoID: PropTypes.string,
  photoAltDesc: PropTypes.string,
  photoName: PropTypes.string,
};
PhotoCardImg.defaultProps = {
  photoID: '',
  photoAltDesc: '',
  photoName: '',
};

export default PhotoCardImg;
