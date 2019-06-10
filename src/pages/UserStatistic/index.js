import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment-timezone';
import Highcharts from 'react-highcharts';
import axios from 'axios';
import get from 'lodash/get';
import { Spinner } from '../../components';
import { URL_FOR_USER_STATISTIC } from '../../constants/urls';
import './index.css';

class UserStatistic extends PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {
      isListingLoading: false,
      highchartsConfigs: {
        highchartsDownloadsConfig: {},
        highchartsViewsConfig: {},
        highchartsLikesConfig: {},
      },
    };
  }

  componentDidMount = () => {
    const highchartsConfigs = {
      highchartsDownloadsConfig: {
        title: 'My Downloads',
        seriesName: 'Downloads',
        colors: 'rgba(255, 0, 255, .5)',
      },
      highchartsViewsConfig: {
        title: 'My Views',
        seriesName: 'Views',
        colors: 'rgba(255, 165, 0, .5)',
      },
      highchartsLikesConfig: {
        title: 'My Likes',
        seriesName: 'Likes',
        colors: 'rgba(0, 255, 0, .5)',
      },
    };
    this.createCharts(highchartsConfigs);
  };

  createCharts = (config) => {
    const configArr = Object.entries(config);
    const newObj = {};

    configArr.forEach((item) => {
      newObj[item[0]] = {
        chart: {
          type: 'area',
        },
        colors: [item[1].colors],
        title: {
          text: item[1].title,
        },
        xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        plotOptions: {
          area: {
            stacking: 'normal',
            lineColor: item[1].colors,
            lineWidth: 1,
            marker: {
              lineWidth: 6,
              lineColor: item[1].colors,
            },
          },
        },
        series: [
          {
            name: item[1].seriesName,
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
      };
    });

    this.setState({
      highchartsConfigs: newObj,
    }, () => {
      this.handleUserPhotoListingQuery();
    });
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
      const highchartsDownloadsConfigData = get(res, 'data.downloads.historical.values') || [];
      const highchartsViewsConfigData = get(res, 'data.views.historical.values') || [];
      const highchartsLikesConfigData = get(res, 'data.likes.historical.values') || [];
      const highchartsConfigsObject = {
        highchartsDownloadsConfig: {
          ...highchartsConfigs.highchartsDownloadsConfig,
          xAxis: {
            categories: highchartsDownloadsConfigData.map(item => moment(item.date).format('DD MMMM YYYY')),
          },
          series: [
            {
              ...highchartsConfigs.highchartsDownloadsConfig.series[0],
              data: highchartsDownloadsConfigData.map(item => item.value),
            },
          ],
        },
        highchartsViewsConfig: {
          ...highchartsConfigs.highchartsViewsConfig,
          xAxis: {
            categories: highchartsViewsConfigData.map(item => moment(item.date).format('DD MMMM YYYY')),
          },
          series: [
            {
              ...highchartsConfigs.highchartsViewsConfig.series[0],
              data: highchartsViewsConfigData.map(item => item.value),
            },
          ],
        },
        highchartsLikesConfig: {
          ...highchartsConfigs.highchartsLikesConfig,
          xAxis: {
            categories: highchartsLikesConfigData.map(item => moment(item.date).format('DD MMMM YYYY')),
          },
          series: [
            {
              ...highchartsConfigs.highchartsLikesConfig.series[0],
              data: highchartsLikesConfigData.map(item => item.value),
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
