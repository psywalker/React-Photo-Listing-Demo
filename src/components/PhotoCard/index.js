import React from 'react';
import './PhotoCard.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardImage,
  CardTitle,
  Badge,
} from 'mdbreact';

const COLOR_LIST = [
  'pink',
  'light-blue',
  'indigo',
  'purple',
  'orange',
  'green',
];
const PhotoCard = ({ tags, photoName, title, photoID, userAvatar, onSearchTagValue }) => (
  <Card className="photo-card">
    <Link to={`/photo/${photoID}`}>
      <CardImage className="img-fluid photo-card__img" src={photoName} />
    </Link>
    <CardBody>
      <CardTitle><img className="photo-card__user-ava" src={userAvatar} alt="" /> {title}</CardTitle>
      {tags.map((item, i) => (
        <Badge key={item.title} onClick={() => onSearchTagValue(item.title)} tag="a" href="#!" color={i < COLOR_LIST.length ? COLOR_LIST[i] : 'default'}>
          { item.title }
        </Badge>))
      }
    </CardBody>
  </Card>);

PhotoCard.propTypes = {
  photoName: PropTypes.string,
  title: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.object),
  userAvatar: PropTypes.string,
  onSearchTagValue: PropTypes.func,
};
PhotoCard.defaultProps = {
  photoName: '',
  title: 'Noname',
  tags: [], 
  userAvatar: '',
  onSearchTagValue: () => {},
};

export default PhotoCard;
