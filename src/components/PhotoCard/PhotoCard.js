import React, { Component } from 'react';
import './PhotoCard.css';
import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  CardImage,
  CardTitle,
  Badge,
} from 'mdbreact';

class PhotoCard extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      tags: [],
      tagsColor: [
        'pink',
        'light-blue',
        'indigo',
        'purple',
        'orange',
        'green',
      ],
    };
  }

  componentDidMount() {
    const { tags } = this.props;
    this.setState({ tags: tags.split(', ') });
  }

  render() {
    const { photoName, title } = this.props;
    const { tags, tagsColor } = this.state;
    return (
      <Card className="photo-card">
        <CardImage className="img-fluid photo-card__img" src={photoName} />
        <CardBody>
          <CardTitle>{title}</CardTitle>
          {tags.map((item, i) => (
            <Badge key={item} tag="a" href="#!" color={i < tagsColor.length ? tagsColor[i] : 'default'}>
              { item }
            </Badge>))
          }
        </CardBody>
      </Card>
    );
  }
}


PhotoCard.propTypes = {
  photoName: PropTypes.string,
  title: PropTypes.string,
  tags: PropTypes.string,
};
PhotoCard.defaultProps = {
  photoName: '',
  title: 'Noname',
  tags: '',

};

export default PhotoCard;
