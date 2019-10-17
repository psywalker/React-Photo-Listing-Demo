import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const PhotoCardDescription = memo(({
  photoDesc,
}) => (
  <p
    className="photo-card-list__desc photo-card-desc"
    data-test="photoCardDesc"
  >
    { photoDesc }
  </p>
));

PhotoCardDescription.propTypes = {
  photoDesc: PropTypes.string,
};
PhotoCardDescription.defaultProps = {
  photoDesc: '',
};

export default PhotoCardDescription;
