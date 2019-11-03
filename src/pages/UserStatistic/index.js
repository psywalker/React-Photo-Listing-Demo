import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Spinner, Error, HighchartsHOC } from '../../components';
import { userStatistingRequestAction } from '../../actions';
import './index.css';

export class UserStatistic extends Component {
  state = {
    chartData: [],
  };

  componentDidMount = () => {
    const { userId } = this.props;
    const { userStatistingRequestAction: handleAction } = this.props;
    handleAction(userId);
  }

  componentDidUpdate = (prevProps) => {
    const { lang: langPrev } = prevProps;
    const { chartData: charDataNext, lang: langNext } = this.props;
    const { chartData } = this.state;

    if (JSON.stringify(chartData) !== JSON.stringify(charDataNext)) {
      return this.setState({ chartData: charDataNext });
    }
    if (langPrev !== langNext) {
      return this.setState({ chartData: [...chartData] });
    }

    return false;
  }

  render() {
    const {
      isListingLoading,
      requestError,
      t,
    } = this.props;
    const { chartData } = this.state;

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
              key={item.dates[i]}
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
  lang: PropTypes.string,
};
UserStatistic.defaultProps = {
  userStatistingRequestAction: () => {},
  isListingLoading: false,
  userId: '',
  chartData: [],
  requestError: false,
  t: () => {},
  lang: 'ru',
};

export const mapStateToProps = (state) => {
  const { userstatistic, charts, lang } = state;
  return { ...userstatistic, ...charts, lang };
};

const mapDispatchToProps = ({
  userStatistingRequestAction,
});

export default withTranslation()(connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserStatistic));
