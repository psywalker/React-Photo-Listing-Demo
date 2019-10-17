import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './index.scss';

const PhotoCardImg = memo(({
  photoID,
  photoAltDesc,
  photoName,
}) => (
  <div className="photo-card-list__img photo-card-img">
    <Link
      data-test="photoCardPhotoLink"
      to={`/photo/${photoID}`}
      className="photo-card-img__link"
    >
      <img
        data-test="photoCardImg"
        className="photo-card-img__photo"
        alt={photoAltDesc}
        src={photoName}
      />
    </Link>
  </div>
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
