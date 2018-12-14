import React, { Component } from 'react';
import { Row, Col, Pagination } from "antd";
import * as Highcharts from "react-highcharts"; 
import Spinner from '../../components/Spinner';
import PhotoCard from '../../components/PhotoCard';
import axios from 'axios';
import './index.css';

class UserStatistic extends Component {
    constructor(...args) {
      super(...args);
      this.state = {
        isListingLoading: false,
        highchartsConfig: {
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            series: [{
                data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
            }],
        },
        page: 1,
        per_page: 6,
      };
    }

    componentDidMount = () => {
        this.handleUserPhotoListingQuery();
    };

    handleUserPhotoListingQuery = () => {
        const { userId } = this.props;
        const { page, per_page } = this.state;
        this.setState({ isListingLoading: true });


        console.log('333', `${process.env.REACT_APP_UNSPLASH_API_NAME}users/${userId}/statistics?${process.env.REACT_APP_UNSPLASH_API_KEY}`)
        axios.get(`${process.env.REACT_APP_UNSPLASH_API_NAME}users/${userId}/statistics?`, {
            params: {
                page, 
                per_page,
                client_id: process.env.REACT_APP_UNSPLASH_API_KEY,
            },
        }).then((res) => {
            console.log('999:::', res)
            const highchartsConfig = {
                xAxis: {
                    categories: []
                },
                series: [{
                    data: []
                }],
            }
            console.log('000:::', res.data.downloads.historical.values)
            highchartsConfig.xAxis.categories = res.data.downloads.historical.values.map(function(item) {
                return item.date;
            });
            highchartsConfig.series[0].data = res.data.downloads.historical.values.map(function(item) {
                return item.value;
            });

            this.setState({
                highchartsConfig,
                isListingLoading: false,
            }); 
        })
        .catch(() => {
            console.log('api.unsplash not responding');
        });
    }
    render() {
        const {
            isListingLoading,
            highchartsConfig,
        } = this.state;
        return (
            <div>
                { isListingLoading && (<Spinner />)}
                <Highcharts config = {highchartsConfig}></Highcharts>
            </div>
        );
    }
}
      
export default UserStatistic;