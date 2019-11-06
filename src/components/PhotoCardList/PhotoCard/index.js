import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import PhotoCardImg from '../PhotoCardImg';
import PhotoCardTags from '../PhotoCardTags';
import PhotoCardAutor from '../PhotoCardAutor';
import LikesButton from '../../LikesButton';
import DownLoadButton from '../../DownLoadButton';
import './index.scss';

const PhotoCard = memo(({
  onSearchTagValue,
  item,
}) => {
  const login = useSelector(state => state.login);
  const { profileName } = login;

  return (
    <li className="photo-card-list-item photo-card-list__item">
      <header className="photo-card-list__header">
        <PhotoCardAutor
          userID={item.userID}
          userAvatar={item.userAvatar}
          title={item.title}
        />

        { profileName && <LikesButton photoID={item.photoID} /> }
      </header>

      <PhotoCardImg
        photoID={item.photoID}
        photoAltDesc={item.photoAltDesc}
        photoName={item.photoName}
      />

      <footer className="photo-card-list__footer">
        <PhotoCardTags
          onSearchTagValue={onSearchTagValue}
          tags={item.tags}
        />

        <DownLoadButton
          altDescriprion={item.photoAltDesc}
          photoDesc={item.photoDesc}
          photoSrc={item.photoName}
          photoUrlSizes={item.photoUrlSizes}
          placement="leftBottom"
          userID={item.userID}
          title={item.title}
        />
      </footer>
    </li>
  );
});


PhotoCard.propTypes = {
  onSearchTagValue: PropTypes.func,
  item: PropTypes.shape({}),
};
PhotoCard.defaultProps = {
  onSearchTagValue: () => {},
  item: {},
};

export default PhotoCard;
