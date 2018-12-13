import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Avatar, Menu, Icon, Tabs  } from "antd";
import ButtonBack from '../../components/ButtonBack';
import UserPhotoListing from '../../pages/UserPhotoListing';
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
            <Row style={{display: 'flex', justifyContent: 'center', margin: '30px 0'}}>
                <Col>
                    <Menu mode="horizontal">
                        <Menu.Item key="back" style={{padding: '0'}}>
                            <ButtonBack />
                        </Menu.Item>
                        <Menu.Item key="home">
                            <Link to={`/`}>
                                <Icon component={() => <img className="user__icon-home" alt="pixabay.com" src="https://i.pinimg.com/236x/d2/63/bd/d263bd90744ac5f17e8f17c6d45fd98c.jpg"/>} />
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
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
            <Row style={{display: 'flex', justifyContent: 'center'}}>
                <Col>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="My photos" key="1">
                        <UserPhotoListing userId={match.params.id} />
                    </TabPane>
                    <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                    <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
                </Tabs>
                </Col>
            </Row>
        </div>
        );
    }
}

export default User;