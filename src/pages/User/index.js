import React, { Component } from 'react';
import { Row, Col, Avatar, Tabs  } from "antd";
import UserPhotoListing from '../../pages/UserPhotoListing';
import UserLikesPhotos from '../../pages/UserLikesPhotos';
import UserStatistic from '../../pages/UserStatistic';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import './user.css';

const TabPane = Tabs.TabPane;

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
            userFirstPhoto,
         } = this.state;

         const { match } = this.props;
        return (
        <div className="user-container">
            { isListingLoading && (<Spinner />)}
 
            <Row style={{display: 'flex', justifyContent: 'center'}}>
                <Col>
                    <img
                        className="user-card__first-img"
                        alt="example"
                        src={userFirstPhoto}
                    />
                    <div className="user-card__photo-wrap">
                        <Avatar size={150} src={userPhoto} />
                    </div>
                </Col>
            </Row>
            <Row style={{display: 'flex', justifyContent: 'center', overflow: 'hidden'}}>
                <Col>
                    <div className="user-tabs">
                        <Tabs className="user-tabs__item" defaultActiveKey="1">
                            <TabPane tab="My photos" key="1"  className="user-tabs__pane" >
                                <UserPhotoListing userId={match.params.id} />
                            </TabPane>
                            <TabPane tab="My likes" key="2"  className="user-tabs__pane" >
                                <UserLikesPhotos userId={match.params.id} />
                            </TabPane>
                            <TabPane tab="My statistic" key="3"  className="user-tabs__pane" >
                                <UserStatistic userId={match.params.id} />
                            </TabPane>
                        </Tabs>
                    </div>
                </Col>
            </Row>
        </div>
        );
    }
}

export default User;