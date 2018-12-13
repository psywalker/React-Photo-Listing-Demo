import React, { Component } from 'react';
import { Row, Col, Pagination } from "antd";
import Spinner from '../../components/Spinner';
import PhotoCard from '../../components/PhotoCard';
import axios from 'axios';
import './index.css';

class UserPhotoListing extends Component {
    constructor(...args) {
      super(...args);
      this.state = {
        isListingLoading: false,
        cards: [],
        totalCards: 10,
        page: 1,
        per_page: 6,
      };
    }

    componentDidMount = () => {
        this.handleUserPhotoListingQuery();
    };

    handlePaginationChange = (current) => { 
        this.setState({
           page: current,
           per_page: 6,
        }, this.handleUserPhotoListingQuery);
    
    };

    handleUserPhotoListingQuery = () => {
        const { match, history } = this.props;
        const { page, per_page } = this.state;
        this.setState({ isListingLoading: true });
        axios.get(`${process.env.REACT_APP_UNSPLASH_API_NAME}users/${match.params.id}/photos?`, {
            params: {
                page, 
                per_page,
                client_id: process.env.REACT_APP_UNSPLASH_API_KEY
            },
        }).then((res) => {
            console.log('111::', res)
            const cards = res.data;
            const totalCards = parseInt(res.headers['x-total'], 10);
            
            this.setState({
              cards,
              isListingLoading: false,
              totalCards,
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
            cards,
            totalCards,
            page,
        } = this.state;
        return (
            <div>
                { isListingLoading && (<Spinner />)}
                <div>
                    <Row justify="center" style={{margin: '40px 0'}}>
                        <Col span={24}>
                            {!isListingLoading && (
                                <ul className="photo-list">
                                {
                                cards.map((item, index) => (
                                    <li key={item.id} className="photo-list__item pl-3">
                                        <PhotoCard 
                                            photoName={item.urls.regular} 
                                            title="" 
                                            tags={item.photo_tags}  
                                            photoID={item.id}
                                            userID={item.user.username}
                                            userAvatar={item.user.profile_image.small}
                                            onSearchTagValue={this.handleSearchText}
                                    />
                                    </li>))
                                }
                                </ul>
                            )}
                        </Col>
                    </Row>
                    <Row justify="center" style={{display: 'flex', justifyContent: 'center'}}>
                        <Col span={12}  style={{display: 'flex', justifyContent: 'center'}}>
                            <Pagination className="ml-3" onChange={this.handlePaginationChange} showSizeChanger current={page} defaultCurrent={1} total={totalCards} />
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
      
export default UserPhotoListing;