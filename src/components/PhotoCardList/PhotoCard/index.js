import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import PhotoCardImg from '../PhotoCardImg';
import PhotoCardTags from '../PhotoCardTags';
import PhotoCardAutor from '../PhotoCardAutor';
import LikesButton from '../../LikesButton';
import DownLoadButton from '../../DownLoadButton';
import getLoginData from '../../../utils/getLoginData';
import './index.scss';

const PhotoCard = memo(({
  onSearchTagValue,
  item,
}) => {
  const localStorageloginData = getLoginData();
  const login = useSelector(state => state.login);
  const { profileName } = login;

  return (
    <li className="photo-card-list-item photo-card-list__item">

      <PhotoCardAutor
        userID={item.userID}
        userAvatar={item.userAvatar}
        title={item.title}
      />

      { (localStorageloginData || profileName) && <LikesButton photoID={item.photoID} /> }

      <PhotoCardImg
        photoID={item.photoID}
        photoAltDesc={item.photoAltDesc}
        photoName={item.photoName}
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
