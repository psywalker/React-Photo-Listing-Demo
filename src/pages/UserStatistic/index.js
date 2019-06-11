import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Highcharts from 'react-highcharts';
import { Spinner } from '../../components';
import { userStatistingRequestAction } from '../../actions';
import './index.css';

class UserStatistic extends PureComponent {
  componentDidMount = () => {
    const { userId } = this.props;
    const { userStatistingRequestAction: handleAction } = this.props;
    handleAction(userId);
  }

  render() {
    const { isListingLoading, highchartsConfigs, requestError } = this.props;
    return (
      <div className="user-statistic">
        { isListingLoading && (<Spinner className="spinner" />)}
        { !isListingLoading && !requestError && (
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
        )}
        { !isListingLoading && requestError && (
          <p>
            При запросе возникла ошибка. Попробуйте сделать запрос позже!
            {' '}
            <Link to="/">
              Перейти на главную.
            </Link>
          </p>
        )}
      </div>
    );
  }
}

UserStatistic.propTypes = {
  userStatistingRequestAction: PropTypes.func,
  isListingLoading: PropTypes.bool,
  userId: PropTypes.string,
  highchartsConfigs: PropTypes.shape({
    highchartsDownloadsConfig: PropTypes.shape({}),
    highchartsViewsConfig: PropTypes.shape({}),
    highchartsLikesConfig: PropTypes.shape({}),
  }),
  requestError: PropTypes.bool,
};
UserStatistic.defaultProps = {
  userStatistingRequestAction: () => {},
  isListingLoading: false,
  userId: '',
  highchartsConfigs: {
    highchartsDownloadsConfig: {},
    highchartsViewsConfig: {},
    highchartsLikesConfig: {},
  },
  requestError: false,
};

const mapStateToProps = (state) => {
  const { userstatistic } = state;
  return userstatistic;
};

const mapDispatchToProps = ({
  userStatistingRequestAction,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserStatistic);
