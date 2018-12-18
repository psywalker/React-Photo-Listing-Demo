import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { Card } from "antd";
import axios from 'axios';
import './photo.css';
const { Meta } = Card;

class Photo extends Component {
    constructor(...args) {
      super(...args);
      this.state = {
        isListingLoading: false,
        photoSrc: null,
        userId: 'User',
        userName: 'UserName',
        userNic: 'UserNic',
        userLastName: '',
        userPortfolioUrl: '',
        photoCreated: '',
        photoDesc: '',
      }
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
            console.log('111:::', res)
            const photoSrc = res.data.urls.full;
            const userId = res.data.user.id;
            const userName = res.data.user.first_name;
            const userNic = res.data.user.username;
            const userLastName = res.data.user.last_name;
            const userPortfolioUrl = res.data.user.portfolio_url;
            const photoCreated = res.data.created_at;
            const photoDesc = res.data.description;
  
            this.setState({
                isListingLoading: false,
                photoSrc,
                userId,
                userName,
                userLastName,
                userPortfolioUrl,
                photoCreated,
                userNic,
                photoDesc,
            });
        })
        .catch((err, error) => {
          console.log('api.unsplash not responding');
          history.push('/') 
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
            { isListingLoading && (<Spinner />)}
            <Card
                style={{ width: '100%' }}
                cover={<img
                    className="photo__img"
                    alt="example"
                    src={photoSrc}
                    />
                }
            >
                <Meta className="photo__desc" title={`${photoDesc ? photoDesc : 'No title'}`} />
                <Link to={`/users/${userNic}`}>
                    <p>Autor's page link</p>
                </Link>
                <a className="photo__autor-link" href={userPortfolioUrl}>Autor's portfolio link</a>
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