import React from 'react';
import './PhotoCard.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Avatar, Tag } from "antd";
const { Meta } = Card;

const PhotoCard = ({ tags, photoName, photoDesc, title, photoID, userID, userAvatar, onSearchTagValue }) => (
    <div className="photo-card-self">
      <Card
        style={{ width: '100%' }}
        cover={
          <Link className="photo-card__photo-link" to={`/photo/${photoID}`}>
            <img
              className="photo-card__img"
              alt="example"
              src={photoName}
            />
          </Link>
        }
      >
    
    { title && (<Link className="photo-card-self__link-ava" to={`/users/${userID}`}>
        <Meta
          avatar={
            <Avatar src={userAvatar} />
          }
          title={title}
        />

      </Link>)}
      <p className="photo-card-self__desc">{photoDesc}</p>
      <div className="photo-card-self__badge-wrap">
        {tags.map((item, i) => (
            <Tag onClick={() => onSearchTagValue(item.title)} className="photo-card-self__badge" key={item.title}>
              {item.title}
            </Tag>))
          }
      </div>
    </Card>
  </div>);

PhotoCard.propTypes = {
  photoName: PropTypes.string,
  photoDesc: PropTypes.string,
  title: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.object),
  userAvatar: PropTypes.string,
  onSearchTagValue: PropTypes.func,
  photoID: PropTypes.string,
  userID: PropTypes.string,
};
PhotoCard.defaultProps = {
  photoName: '',
  photoDesc: '',
  title: 'Noname',
  tags: [], 
  userAvatar: '',
  photoID: '',
  userID: '',
  onSearchTagValue: () => {},
};

export default PhotoCard;
