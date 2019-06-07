import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import './photo.css';

const { Meta } = Card;

class Photo extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      isListingLoading: false,
      photoSrc: null,
      userNic: 'UserNic',
      userPortfolioUrl: '',
      photoDesc: '',
    };
  }

  componentDidMount = () => {
    this.handlePhotoQuery();
  };

  handlePhotoQuery = () => {
    const { match, history } = this.props;
    this.setState({ isListingLoading: true });
    const API_URL = `${process.env.REACT_APP_UNSPLASH_API_NAME}photos/${match.params.id}?client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`;
    axios.get(API_URL)
      .then((res) => {
        const photoSrc = res.data.urls.full;
        const userNic = res.data.user.username;
        const userPortfolioUrl = res.data.user.portfolio_url;
        const photoDesc = res.data.description;

        this.setState({
          isListingLoading: false,
          photoSrc,
          userPortfolioUrl,
          userNic,
          photoDesc,
        });
      })
      .catch(() => {
        history.push('/');
      });
  }

  render() {
    const {
      isListingLoading,
      photoSrc,
      userPortfolioUrl,
      userNic,
      photoDesc,
    } = this.state;

    return (
      <div className="photo-container photo">
        { isListingLoading && (<Spinner className="spinner" />)}
        <Card
          style={{ width: '100%' }}
          cover={(
            <img
              className="photo__img"
              alt="example"
              src={photoSrc}
            />
          )}
        >
          <Meta className="photo__desc" title={`${photoDesc || 'No title'}`} />
          <Link to={`/users/${userNic}`}>
            <p className="photo__autor-page-link">Autor's page link</p>
          </Link>
          <a className="photo__autor-link" href={userPortfolioUrl}>Autor's portfolio link</a>
        </Card>
      </div>
    );
  }
}

export default Photo;
