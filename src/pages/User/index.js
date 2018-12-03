import React, { Component } from 'react';
import { Card, CardBody } from 'mdbreact';
import ButtonBack from '../../components/ButtonBack';
import axios from 'axios';
import './user.css';

class User extends Component {
    constructor(...args) {
      super(...args);
      this.state = {
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
        const { match } = this.props;
        const API_URL = `${process.env.REACT_APP_UNSPLASH_API_NAME}users/${match.params.id}?client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`;
        axios.get(API_URL)
        .then((res) => {
            const userName = res.data.first_name;
            const userLastName = res.data.last_name;
            const userPhoto = res.data.profile_image.large;
            const userPortfolioUrl = res.data.portfolio_url;
            const userFirstPhoto = res.data.photos[0].urls.regular;

            this.setState({
                userName,
                userLastName,
                userPhoto,
                userFirstPhoto,
                userPortfolioUrl,
            });
        })
        .catch(() => {
          console.log('api.unsplash not responding');
          
        });
    }

    render() {
        const { 
            userPhoto,
            userName,
            userLastName,
            userPortfolioUrl,
            userFirstPhoto,
         } = this.state;
        return (
        <div className="user">
            <Card className="user-card">
                <img className="user-card__first-img" src={userFirstPhoto} alt="" />
                <img className="user-card__photo" src={userPhoto} alt="" />
                <CardBody>
                    <h2>{userName} {userLastName}</h2>
                    <a href={userPortfolioUrl}>{`${userName}'s`} portfolio link</a>
                    <div>
                        <ButtonBack />
                    </div>
                </CardBody>
            </Card>
        </div>
        );
    }
}

export default User;