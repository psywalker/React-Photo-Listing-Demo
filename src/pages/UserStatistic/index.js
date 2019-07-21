import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spinner, Error, HighchartsHOC } from '../../components';
import { userStatistingRequestAction } from '../../actions';
import './index.css';

export class UserStatistic extends PureComponent {
  componentDidMount = () => {
    const { userId } = this.props;
    const { userStatistingRequestAction: handleAction } = this.props;
    handleAction(userId);
  }

  render() {
    const {
      isListingLoading,
      requestError,
      chartData,
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
            text="Failed to get user statistics. Try later again"
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
};
UserStatistic.defaultProps = {
  userStatistingRequestAction: () => {},
  isListingLoading: false,
  userId: '',
  chartData: [],
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
