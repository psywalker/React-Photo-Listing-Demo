import React from 'react';
import './PhotoCard.css';
import PropTypes from 'prop-types';
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
const PhotoCard = ({ tags, photoName, title }) => (
  <Card className="photo-card">
    <CardImage className="img-fluid photo-card__img" src={photoName} />
    <CardBody>
      <CardTitle>{title}</CardTitle>
      {tags.map((item, i) => (
        <Badge key={item} tag="a" href="#!" color={i < COLOR_LIST.length ? COLOR_LIST[i] : 'default'}>
          { item }
        </Badge>))
      }
    </CardBody>
  </Card>);

PhotoCard.propTypes = {
  photoName: PropTypes.string,
  title: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
};
PhotoCard.defaultProps = {
  photoName: '',
  title: 'Noname',
  tags: [],

};

export default PhotoCard;
