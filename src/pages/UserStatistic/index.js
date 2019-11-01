import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Spinner, Error, HighchartsHOC } from '../../components';
import { userStatistingRequestAction } from '../../actions';
import './index.css';

export class UserStatistic extends Component {
  componentDidMount = () => {
    const { userId } = this.props;
    const { userStatistingRequestAction: handleAction } = this.props;
    handleAction(userId);
  }

  shouldComponentUpdate = (nextProps) => {
    const { chartData: charDataPrev } = this.props;
    const { chartData: charDataNext } = nextProps;
    return JSON.stringify(charDataPrev) !== JSON.stringify(charDataNext);
  }

  render() {
    const {
      isListingLoading,
      requestError,
      chartData,
      t,
    } = this.props;

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
  userId: PropTypes.string,
  chartData: PropTypes.arrayOf(PropTypes.shape({})),
  requestError: PropTypes.bool,
  t: PropTypes.func,
};
UserStatistic.defaultProps = {
  userStatistingRequestAction: () => {},
  isListingLoading: false,
  userId: '',
  chartData: [],
  requestError: false,
  t: () => {},
};

export const mapStateToProps = (state) => {
  const { userstatistic } = state;
  return userstatistic;
};

const mapDispatchToProps = ({
  userStatistingRequestAction,
});

export default withTranslation()(connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserStatistic));
