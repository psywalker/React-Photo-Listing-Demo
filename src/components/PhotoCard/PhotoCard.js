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
    let { tags } = this.props;
    tags = tags.split(', ');
    this.setState({ tags });
  }

  render() {
    const { photoName, title } = this.props;
    const { tags, tagsColor } = this.state;
    return (
      <Card>
        <CardImage className="img-fluid" src={photoName} />
        <CardBody>
          <CardTitle>{title}</CardTitle>
          {tags.map((item, i) => (
            <Badge tag="a" href="#!" color={i < tagsColor.length ? tagsColor[i] : 'pink'}>
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
