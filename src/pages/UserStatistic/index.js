import React, { Component } from 'react';
import Highcharts from "react-highcharts"; 
import Spinner from '../../components/Spinner';
import axios from 'axios';
import './index.css';

class UserStatistic extends Component {
    constructor(...args) {
      super(...args);
      this.state = {
        isListingLoading: false,
        highchartsConfigs: {
            highchartsDownloadsConfig: {
                title: {
                    text: 'My Downloads'
                },
                xAxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    className: 'highcharts1111',
                },
                series: [
                    {
                        name: 'Downloads',
                        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4],
                        className: 'user-statistic-chart__series_downloads',
                        
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
            highchartsViewsConfig: {
                title: {
                    text: 'My Views'
                },
                xAxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },
                series: [
                    {
                        name: 'Views',
                        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4],
                        className: 'user-statistic-chart__series_views',
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
            highchartsLikesConfig: {
                title: {
                    text: 'My Likes'
                },
                xAxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },
                series: [
                    {
                        name: 'Likes',
                        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4],
                        className: 'user-statistic-chart__series_likes',
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
        },
      };
    }

    componentDidMount = () => {
        this.handleUserPhotoListingQuery();
    };

    handleUserPhotoListingQuery = () => {
        const { userId } = this.props;
        const { highchartsConfigs } = this.state;
        this.setState({ isListingLoading: true });

        axios.get(`${process.env.REACT_APP_UNSPLASH_API_NAME}users/${userId}/statistics?`, {
            params: {
                client_id: process.env.REACT_APP_UNSPLASH_API_KEY,
            },
        }).then((res) => {

            const highchartsConfigsObject = {
                highchartsDownloadsConfig: {
                    ...highchartsConfigs.highchartsDownloadsConfig,
                    xAxis: {
                        categories: res.data.downloads.historical.values.map((item) => item.date),
                        
                    },
                    series: [
                        {
                            ...highchartsConfigs.highchartsDownloadsConfig.series[0],
                            data: res.data.downloads.historical.values.map((item) => item.value),
                        }
                    ] 
                },
                highchartsViewsConfig: {
                    ...highchartsConfigs.highchartsViewsConfig,
                    xAxis: {
                        categories: res.data.views.historical.values.map((item) => item.date),
                    },
                    series: [
                        {
                            ...highchartsConfigs.highchartsViewsConfig.series[0],
                            data: res.data.views.historical.values.map((item) => item.value),
                        }
                    ] 
                },
                highchartsLikesConfig: {
                    ...highchartsConfigs.highchartsLikesConfig,
                    xAxis: {
                        categories: res.data.likes.historical.values.map((item) => item.date),
                    },
                    series: [
                        {
                            ...highchartsConfigs.highchartsLikesConfig.series[0],
                            data: res.data.likes.historical.values.map((item) => item.value),
                        }
                    ] 
                },
            }
            this.setState({
                highchartsConfigs: highchartsConfigsObject,
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
            highchartsConfigs,
        } = this.state;
        return (
            <div className="user-statistic">
                { isListingLoading && (<Spinner className="spinner" />)}
                <div className="user-statistic__charts">
                <div className="user-statistic__chart-wrap">
                        <Highcharts key="1"  className="user-statistic__chart" config = {highchartsConfigs.highchartsDownloadsConfig} />
                    </div>

                    <div className="user-statistic__chart-wrap">
                        <Highcharts key="2"   className="user-statistic__chart" config = {highchartsConfigs.highchartsViewsConfig} />
                    </div>

                    <div className="user-statistic__chart-wrap">
                        <Highcharts  key="3"  className="user-statistic__chart user-statistic-chart" config = {highchartsConfigs.highchartsLikesConfig} />
                    </div>
                </div>
            </div>
        );
    }
}
      
export default UserStatistic;