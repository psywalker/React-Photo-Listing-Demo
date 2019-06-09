import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment-timezone';
import Highcharts from 'react-highcharts';
import axios from 'axios';
import { Spinner } from '../../components';
import { URL_FOR_USER_STATISTIC } from '../../constants/urls';
import './index.css';

class UserStatistic extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      isListingLoading: false,
      highchartsConfigs: {
        highchartsDownloadsConfig: {
          chart: {
            type: 'area',
          },
          colors: ['rgba(255, 0, 255, .5)'],
          title: {
            text: 'My Downloads',
          },
          xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          },
          plotOptions: {
            area: {
              stacking: 'normal',
              lineColor: 'rgba(255, 0, 255, .5)',
              lineWidth: 1,
              marker: {
                lineWidth: 6,
                lineColor: 'rgba(255, 0, 255, .5)',
              },
            },
          },
          series: [
            {
              name: 'Downloads',
              data: [
                29.9,
                71.5,
                106.4,
                129.2,
                144.0,
                176.0,
                135.6,
                148.5,
                216.4,
                194.1,
                295.6,
                454.4,
              ],
              className: 'user-statistic-chart__series_downloads',
            },
          ],
          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
          },
          responsive: {
            rules: [{
              condition: {
                maxWidth: 700,
              },
              chartOptions: {
                legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom',
                },
              },
            }],
          },
        },
        highchartsViewsConfig: {
          chart: {
            type: 'area',
          },
          title: {
            text: 'My Views',
          },
          colors: ['rgba(255, 165, 0, .5)'],
          xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          },
          plotOptions: {
            area: {
              stacking: 'normal',
              lineColor: 'rgba(255, 165, 0, .5)',
              lineWidth: 1,
              marker: {
                lineWidth: 6,
                lineColor: 'rgba(255, 165, 0, .5)',
              },
            },
          },
          series: [
            {
              name: 'Views',
              data: [
                29.9,
                71.5,
                106.4,
                129.2,
                144.0,
                176.0,
                135.6,
                148.5,
                216.4,
                194.1,
                295.6,
                454.4,
              ],
              className: 'user-statistic-chart__series_views',
            },
          ],
          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
          },
          responsive: {
            rules: [
              {
                condition: {
                  maxWidth: 700,
                },
                chartOptions: {
                  legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom',
                  },
                },
              },
            ],
          },
        },
        highchartsLikesConfig: {
          chart: {
            type: 'area',
          },
          title: {
            text: 'My Likes',
          },
          colors: ['rgba(0, 255, 0, .5)'],
          xAxis: {
            categories: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
            ],
          },
          series: [
            {
              name: 'Likes',
              data: [
                29.9,
                71.5,
                106.4,
                129.2,
                144.0,
                176.0,
                135.6,
                148.5,
                216.4,
                194.1,
                295.6,
                454.4,
              ],
              className: 'user-statistic-chart__series_likes',
            },
          ],
          plotOptions: {
            area: {
              stacking: 'normal',
              lineColor: 'rgba(0, 255, 0, .5)',
              lineWidth: 1,
              marker: {
                lineWidth: 6,
                lineColor: 'rgba(0, 255, 0, .5)',
              },
            },
          },
          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
          },
          responsive: {
            rules: [
              {
                condition: {
                  maxWidth: 700,
                },
                chartOptions: {
                  legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom',
                  },
                },
              },
            ],
          },
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
    const API_URL = URL_FOR_USER_STATISTIC(userId);
    axios.get(API_URL, {
      params: {
        client_id: process.env.REACT_APP_UNSPLASH_API_KEY,
      },
    }).then((res) => {
      const highchartsConfigsObject = {
        highchartsDownloadsConfig: {
          ...highchartsConfigs.highchartsDownloadsConfig,
          xAxis: {
            categories: res.data.downloads.historical.values.map(item => moment(item.date).format('DD MMMM YYYY')),
          },
          series: [
            {
              ...highchartsConfigs.highchartsDownloadsConfig.series[0],
              data: res.data.downloads.historical.values.map(item => item.value),
            },
          ],
        },
        highchartsViewsConfig: {
          ...highchartsConfigs.highchartsViewsConfig,
          xAxis: {
            categories: res.data.views.historical.values.map(item => moment(item.date).format('DD MMMM YYYY')),
          },
          series: [
            {
              ...highchartsConfigs.highchartsViewsConfig.series[0],
              data: res.data.views.historical.values.map(item => item.value),
            },
          ],
        },
        highchartsLikesConfig: {
          ...highchartsConfigs.highchartsLikesConfig,
          xAxis: {
            categories: res.data.likes.historical.values.map(item => moment(item.date).format('DD MMMM YYYY')),
          },
          series: [
            {
              ...highchartsConfigs.highchartsLikesConfig.series[0],
              data: res.data.likes.historical.values.map(item => item.value),
            },
          ],
        },
      };

      this.setState({
        highchartsConfigs: highchartsConfigsObject,
        isListingLoading: false,
      });
    })
      .catch(() => {});
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
            <Highcharts key="1" className="user-statistic__chart" config={highchartsConfigs.highchartsDownloadsConfig} />
          </div>

          <div className="user-statistic__chart-wrap">
            <Highcharts key="2" className="user-statistic__chart" config={highchartsConfigs.highchartsViewsConfig} />
          </div>

          <div className="user-statistic__chart-wrap">
            <Highcharts key="3" className="user-statistic__chart user-statistic-chart" config={highchartsConfigs.highchartsLikesConfig} />
          </div>
        </div>
      </div>
    );
  }
}

UserStatistic.propTypes = {
  userId: PropTypes.string,
};
UserStatistic.defaultProps = {
  userId: '',
};
export default UserStatistic;
