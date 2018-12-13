import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from "antd";
import ButtonBack from '../../components/ButtonBack';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import './user.css';

const ButtonGroup = Button.Group;

class User extends Component {
    constructor(...args) {
      super(...args);
      this.state = {
        isListingLoading: false,
        userNameNic: '',
        userName: '',
        userLastName: '',
        userPhoto: '',
        userFirstPhoto: '',
        userPortfolioUrl: '',
      }
    }

    componentDidMount = () => {
        this.handleUserQuery();
    };

    handleUserQuery = () => {
        const { match, history } = this.props;
        this.setState({ isListingLoading: true });
        const API_URL = `${process.env.REACT_APP_UNSPLASH_API_NAME}users/${match.params.id}?client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`;
        axios.get(API_URL)
        .then((res) => {
            const userNameNic = res.data.username;
            const userName = res.data.first_name;
            const userLastName = res.data.last_name;
            const userPhoto = res.data.profile_image.large;
            const userPortfolioUrl = res.data.portfolio_url;
            const userFirstPhoto = res.data.photos[0].urls.regular;

            this.setState({
                isListingLoading: false,
                userNameNic,
                userName,
                userLastName,
                userPhoto,
                userFirstPhoto,
                userPortfolioUrl,
            });
        })
        .catch(() => {
          console.log('api.unsplash not responding');
          history.push('/') 
        });
    }

    render() {
        const { 
            isListingLoading,
            userPhoto,
            userName,
            userLastName,
            userPortfolioUrl,
            userFirstPhoto,
            userNameNic,
         } = this.state;
        return (
        <div className="user-container">
            { isListingLoading && (<Spinner />)}
            <div className="user">
                <Card
                    className="user-card"
                    style={{ width: '100%' }}
                    cover={
                        <img
                        className="user-card__first-img"
                        alt="example"
                        src={userFirstPhoto}
                        />
                    }
                >
                    <div className="user-card__photo-wrap">
                        <img className="user-card__photo" src={userPhoto} alt="" />
                    </div>
                    <h2 className="user-card__title">{userName} {userLastName}</h2>
                    <a className="user-card__link-portfolio" href={userPortfolioUrl}>{`${userName}'s`} portfolio link</a>
                    <div className="user-card__btn-go-back">
                        <ButtonBack />
                    </div>
                    <div className="user-card__tabs user-tabs">
                        <ButtonGroup>
                            <Link to={`/users/${userNameNic}/photos`}>
                                <Button>My photos</Button>
                            </Link>
                        </ButtonGroup>
                    </div>
                </Card>
            </div>
        </div>
        );
    }
}

export default User;