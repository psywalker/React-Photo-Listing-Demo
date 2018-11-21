import React from 'react';
import './PhotoCard.css';
import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  CardImage,
  CardTitle,
  CardText,
  Badge,
  Fa,
} from 'mdbreact';

const PhotoCard = ({ photoName, title }) => (
  <Card>
    <CardImage className="img-fluid" src={photoName} />
    <CardBody>
      <CardTitle>{title}</CardTitle>
      <CardText>
        <Badge tag="a" href="#!" color="default">
          <Fa icon="facebook" aria-hidden="true" />
        </Badge>
        <Badge tag="a" href="#!" color="primary">
          <Fa icon="instagram" aria-hidden="true" />
        </Badge>
        <Badge tag="a" href="#!" color="success">
          <Fa icon="snapchat-ghost" aria-hidden="true" />
        </Badge>
      </CardText>
    </CardBody>
  </Card>);


PhotoCard.propTypes = {
  photoName: PropTypes.string,
  title: PropTypes.string,
};
PhotoCard.defaultProps = {
  photoName: '',
  title: 'Noname',

};

export default PhotoCard;
