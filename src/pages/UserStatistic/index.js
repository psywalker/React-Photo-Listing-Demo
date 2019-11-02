import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Spinner, Error, HighchartsHOC } from '../../components';
import { userStatistingRequestAction } from '../../actions';
import './index.css';

export class UserStatistic extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      chartData: [],
    };
  }

  componentDidMount = () => {
    const { userId } = this.props;
    const { userStatistingRequestAction: handleAction } = this.props;
    handleAction(userId);
  }

  componentDidUpdate = (prevProps) => {
    const { isChart: isChartPrev } = prevProps;
    const { chartData: charDataNext, isChart: isChartNext } = this.props;
    const { chartData } = this.state;
    if (JSON.stringify(chartData) !== JSON.stringify(charDataNext)) {
      this.setState({ chartData: charDataNext });
    }
    if (isChartPrev !== isChartNext) {
      if (isChartNext) this.setState({ chartData: [...chartData] });
    }
  }

  render() {
    const {
      isListingLoading,
      requestError,
      t,
      isChart,
    } = this.props;
    const { chartData } = this.state;
    const num = isChart ? 0 : 1;
 
    return (
      <div
        data-test="userStatistic"
        className="user-statistic"
      >
        { isListingLoading && (
          <Spinner
            data-test="spinner"
            className="spinner"
          />
        )}
        { !isListingLoading && !requestError && (
        <div
          style={{ opacity: num }}
          data-test="userStatisticCharts"
          className="user-statistic__charts"
        >
          { chartData.map((item, i) => (
            <HighchartsHOC
              data-test="highchartsHOC"
              config={item}
              configNum={i}
              key={i}
            />
          ))}
        </div>
        )}
        { !isListingLoading && requestError && (
          <Error
            data-test="error"
            text={t('errors.failedUserStatistics')}
          />
        )}
      </div>
    );
  }
}

UserStatistic.propTypes = {
  userStatistingRequestAction: PropTypes.func,
  isListingLoading: PropTypes.bool,
  isChart: PropTypes.bool,
  userId: PropTypes.string,
  chartData: PropTypes.arrayOf(PropTypes.shape({})),
  requestError: PropTypes.bool,
  t: PropTypes.func,
};
UserStatistic.defaultProps = {
  userStatistingRequestAction: () => {},
  isListingLoading: false,
  isChart: false,
  userId: '',
  chartData: [],
  requestError: false,
  t: () => {},
};

export const mapStateToProps = (state) => {
  const { userstatistic, charts } = state;
  return { ...userstatistic, ...charts };
};

const mapDispatchToProps = ({
  userStatistingRequestAction,
});

export default withTranslation()(connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserStatistic));
