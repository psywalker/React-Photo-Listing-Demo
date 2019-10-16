import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './index.scss';

const PhotoCardAutor = memo(({
  userID,
  userAvatar,
  title,
}) => (
  <div
    data-test="photoCardAutor"
    className="photo-card__autor photo-card-autor"
  >
    <Link
      data-test="photoCardAutorLink"
      className="photo-card-autor__link"
      to={`/users/${userID}`}
    >
      <img
        data-test="photoCardAutorAvatar"
        className="photo-card-autor__avatar"
        alt={userID}
        src={userAvatar}
      />
      <span
        data-test="photoCardAutorName"
        className="photo-card-autor__name"
      >
        { title }
      </span>
    </Link>
  </div>
));

PhotoCardAutor.propTypes = {
  userID: PropTypes.string,
  userAvatar: PropTypes.string,
  title: PropTypes.string,
};
PhotoCardAutor.defaultProps = {
  userID: '',
  userAvatar: '',
  title: '',
};

export default PhotoCardAutor;
