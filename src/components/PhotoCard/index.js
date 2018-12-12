import React from 'react';
import './PhotoCard.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Badge, Card, Avatar } from "antd";
const { Meta } = Card;

const COLOR_LIST = [
  'pink',
  'light-blue',
  'indigo',
  'purple',
  'orange',
  'green',
];
const PhotoCard = ({ tags, photoName, title, photoID, userID, userAvatar, onSearchTagValue }) => (
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
    
      <Link className="photo-card-self__link-ava" to={`/users/${userID}`}>
        <Meta
          avatar={
            <Avatar src={userAvatar} />
          }
          title={title}
        />
      </Link>
      {tags.map((item, i) => (
          <Badge onClick={() => onSearchTagValue(item.title)} className="photo-card-self__badge" key={item.title} style={{ backgroundColor: `${i < COLOR_LIST.length ? COLOR_LIST[i] : 'default'}` }} count={item.title} />))
        }
    </Card>
  </div>);

PhotoCard.propTypes = {
  photoName: PropTypes.string,
  title: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.object),
  userAvatar: PropTypes.string,
  onSearchTagValue: PropTypes.func,
  photoID: PropTypes.string,
  userID: PropTypes.string,
};
PhotoCard.defaultProps = {
  photoName: '',
  title: 'Noname',
  tags: [], 
  userAvatar: '',
  photoID: '',
  userID: '',
  onSearchTagValue: () => {},
};

export default PhotoCard;
