import React, { memo } from 'react';
import PropTypes from 'prop-types';
import PhotoCardImg from '../PhotoCardImg';
import PhotoCardTags from '../PhotoCardTags';
import PhotoCardAutor from '../PhotoCardAutor';
import './index.scss';

const PhotoCard = memo(({
  onSearchTagValue,
  item,
}) => (
  <li className="photo-card-list__item">
    <PhotoCardImg
      photoID={item.photoID}
      photoAltDesc={item.photoAltDesc}
      photoName={item.photoName}
    />

    <PhotoCardTags
      onSearchTagValue={onSearchTagValue}
      tags={item.tags}
    />

    <PhotoCardAutor
      onSearchTagValue={onSearchTagValue}
      userID={item.userID}
      userAvatar={item.userAvatar}
      title={item.title}
    />

  </li>
));


PhotoCard.propTypes = {
  onSearchTagValue: PropTypes.func,
  item: PropTypes.shape({}),
};
PhotoCard.defaultProps = {
  onSearchTagValue: () => {},
  item: {},
};

export default PhotoCard;
