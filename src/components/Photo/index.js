import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    CardBody,
    CardImage,
  } from 'mdbreact';
import axios from 'axios';
import './photo.css';

class Photo extends Component {
    constructor(...args) {
      super(...args);
      this.state = {
        photoSrc: null,
        photoID: 1,
        userId: 'User',
        userName: 'UserName',
        userLastName: '',
        userPortfolioUrl: '',
        photoCreated: '',
      }
    }

    componentDidMount = () => {
        this.handlePhotoQuery();
    };
    componentDidUpdate = (prevProps, prevState) => {
        //this.handlePhotoQuery();
    };

    handlePhotoQuery = () => {
        const { match } = this.props;
        const API_URL = `https://api.unsplash.com/photos/${match.params.id}?client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`;
        
        axios.get(API_URL)
        .then((res) => {

            const photoSrc = res.data.urls.full;
            const photoID = match.params.id;
            const userId = res.data.user.id;
            const userName = res.data.user.first_name;
            const userLastName = res.data.user.last_name;
            const userPortfolioUrl = res.data.user.portfolio_url;
            const photoCreated = res.data.created_at;
  
            this.setState({
                photoSrc,
                photoID,
                userId,
                userName,
                userLastName,
                userPortfolioUrl,
                photoCreated,
            });
        })
        .catch(() => {
          console.log('api.unsplash not responding');
          
        });
    }
    render() {
        const { 
            photoSrc,
            photoID,
            userName,
            userLastName,
            userPortfolioUrl,
         } = this.state;

        return (
        <div className="photo">
            <Card className="photo-card">
                <CardImage className="img-fluid photo-card__img" src={photoSrc} />
                <CardBody>
                    <h1>Photo ID: {photoID}</h1>
                    <h2>Autor: {userName} {userLastName}</h2>
                    <a href={userPortfolioUrl}>Autor's portfolio link</a>

                </CardBody>
            </Card>
        </div>
        );
    }
}

Photo.propTypes = {
    match: PropTypes.object,
};
Photo.defaultProps = {
    match: {},
};

export default Photo;