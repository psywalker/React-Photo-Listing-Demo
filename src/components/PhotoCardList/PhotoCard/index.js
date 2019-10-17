import React, { memo } from 'react';
import PropTypes from 'prop-types';
import PhotoCardImg from '../PhotoCardImg';
import PhotoCardTags from '../PhotoCardTags';
import PhotoCardAutor from '../PhotoCardAutor';
import PhotoCardDescription from '../PhotoCardDescription';
import LikesButton from '../../LikesButton';
import DownLoadButton from '../../DownLoadButton';
import './index.scss';

const PhotoCard = memo(({
  onSearchTagValue,
  item,
}) => (
  <li className="photo-card-list-item photo-card-list__item">

    <PhotoCardAutor
      userID={item.userID}
      userAvatar={item.userAvatar}
      title={item.title}
    />

    <LikesButton />

    <PhotoCardImg
      photoID={item.photoID}
      photoAltDesc={item.photoAltDesc}
      photoName={item.photoName}
    />

    <PhotoCardDescription
      photoDesc={item.photoDesc}
    />

    <PhotoCardTags
      onSearchTagValue={onSearchTagValue}
      tags={item.tags}
    />

    <DownLoadButton
      altDescriprion={item.photoAltDesc}
      photoDesc={item.photoDesc}
      photoSrc={item.photoName}
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
