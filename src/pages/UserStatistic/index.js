import React, { Component } from 'react';
import * as Highcharts from "react-highcharts"; 
import Spinner from '../../components/Spinner';
import axios from 'axios';
import './index.css';

class UserStatistic extends Component {
    constructor(...args) {
      super(...args);
      this.state = {
        isListingLoading: false,
        highchartsConfig: {
            title: {
                text: 'My statistic'
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            series: [
                {
                    name: 'Downloads',
                    data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
                },
                {
                    name: 'Views',
                    data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
                },
                {
                    name: 'Likes',
                    data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
                },
            ],
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            responsive: {
                rules: [{
                  condition: {
                    maxWidth: 700
                  },
                  chartOptions: {
                    legend: {
                      layout: 'horizontal',
                      align: 'center',
                      verticalAlign: 'bottom'
                    }
                  }
                }]
              }
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
                title: {
                    text: 'My statistic'
                },
                xAxis: {
                    categories: []
                },
                series: [
                    {
                        name: 'Downloads',
                        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
                    },
                    {
                        name: 'Views',
                        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
                    },
                    {
                        name: 'Likes',
                        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
                    },
                ],
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },
                responsive: {
                    rules: [{
                      condition: {
                        maxWidth: 700
                      },
                      chartOptions: {
                        legend: {
                          layout: 'horizontal',
                          align: 'center',
                          verticalAlign: 'bottom'
                        }
                      }
                    }]
                  }
            }
            console.log('000:::', res.data.downloads.historical.values)
            highchartsConfig.xAxis.categories = res.data.downloads.historical.values.map(function(item) {
                return item.date;
            });
            highchartsConfig.series[0].data = res.data.downloads.historical.values.map(function(item) {
                return item.value;
            });
            highchartsConfig.series[1].data = res.data.views.historical.values.map(function(item) {
                return item.value;
            });
            highchartsConfig.series[2].data = res.data.likes.historical.values.map(function(item) {
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
            <div className="user-statistic">
                { isListingLoading && (<Spinner />)}
                <div className="user-statistic__charts">
                    <Highcharts config = {highchartsConfig}></Highcharts>
                </div>
            </div>
        );
    }
}
      
export default UserStatistic;