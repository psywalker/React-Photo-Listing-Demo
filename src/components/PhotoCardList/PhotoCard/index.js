import React, { memo } from 'react';
import PropTypes from 'prop-types';
import PhotoCardImg from '../PhotoCardImg';
import PhotoCardTags from '../PhotoCardTags';
import PhotoCardAutor from '../PhotoCardAutor';
import PhotoCardDescription from '../PhotoCardDescription';
import LikesButton from '../../LikesButton';
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
      userID={item.userID}
      userAvatar={item.userAvatar}
      title={item.title}
    />

    <PhotoCardDescription
      photoDesc={item.photoDesc}
    />

    <LikesButton />
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
