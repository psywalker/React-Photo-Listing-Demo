import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardBody,
  CardImage,
  CardTitle,
  CardText,
} from 'mdbreact';

const PhotoCard = ({ photoName }) => (
  <Card>
    <CardImage className="img-fluid" src={photoName} />
    <CardBody>
      <CardTitle>Card title</CardTitle>
      <CardText>
        Some quick example text to build on the card title
        and make up the bulk of the card&apos;s content.
      </CardText>
      <Button href="#">Button</Button>
    </CardBody>
  </Card>);


PhotoCard.propTypes = {
  photoName: PropTypes.string,
};
PhotoCard.defaultProps = {
  photoName: '',

};

export default PhotoCard;
