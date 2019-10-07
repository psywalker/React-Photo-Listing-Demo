import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Avatar,
  Tabs,
} from 'antd';
import { userRequestAction } from '../../actions';
import {
  Spinner,
  UserStatistic,
  Error,
  SmallPhotoListing,
} from '../../components';
import './user.css';

const { TabPane } = Tabs;

export class User extends PureComponent {
  componentDidMount = () => {
    const { match, userRequestAction: requestAction } = this.props;
    requestAction(match);
  };

  render() {
    const {
      match,
      isUserFetching,
      userPhoto,
      userFirstPhoto,
      requestError,
    } = this.props;
    return (
      <div
        data-test="userContainer"
        className="user-container"
      >
        { isUserFetching && (
          <Spinner data-test="spinner" />
        )}
        { !isUserFetching && !requestError && (
          <>
            <Row style={{ display: 'flex', justifyContent: 'center' }}>
              <Col>
                <img
                  data-test="userAvatar"
                  className="user-card__first-img"
                  alt="example"
                  src={userFirstPhoto}
                />
                <div
                  data-test="userCardPhotoWrap"
                  className="user-card__photo-wrap"
                >
                  <Avatar
                    data-test="userCardPhotoAvatar"
                    size={150}
                    src={userPhoto}
                  />
                </div>
              </Col>
            </Row>
            <Row
              style={{
                display: 'flex',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <Col>
                <div
                  data-test="userTabs"
                  className="user-tabs"
                >
                  <Tabs
                    data-test="userTabsItem"
                    className="user-tabs__item"
                    defaultActiveKey="1"
                  >
                    <TabPane
                      tab="My photos"
                      key="1"
                      className="user-tabs__pane"
                    >
                      <SmallPhotoListing
                        data-test="smallPhotoListing"
                        userId={match.params.id}
                        itemNum={0}
                        name="photos"
                      />
                    </TabPane>
                    <TabPane
                      tab="My likes"
                      key="2"
                      className="user-tabs__pane"
                    >
                      <SmallPhotoListing
                        data-test="smallPhotoListing"
                        userId={match.params.id}
                        itemNum={1}
                        name="likes"
                      />
                    </TabPane>
                    <TabPane
                      tab="My statistic"
                      key="3"
                      className="user-tabs__pane"
                    >
                      <UserStatistic
                        data-test="userStatistic"
                        userId={match.params.id}
                      />
                    </TabPane>
                  </Tabs>
                </div>
              </Col>
            </Row>
          </>
        )}
        { !isUserFetching && requestError && (
          <Error
            data-test="photoError"
            text="Sorry, user is not found"
          />
        )}
      </div>
    );
  }
}

User.propTypes = {
  isUserFetching: PropTypes.bool,
  userPhoto: PropTypes.string,
  userFirstPhoto: PropTypes.string,
  userRequestAction: PropTypes.func,
  requestError: PropTypes.bool,
  history: PropTypes.shape({
    prop: PropTypes.string,
  }),
  match: PropTypes.shape({
    prop: PropTypes.string,
  }),
};
User.defaultProps = {
  isUserFetching: true,
  userPhoto: '',
  userFirstPhoto: '',
  userRequestAction: () => {},
  requestError: false,
  history: {},
  match: {
    params: {
      id: '',
    },
  },
};

export const mapStateToProps = (state) => {
  const { user } = state;
  return user;
};

const mapDispatchToProps = ({
  userRequestAction,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(User);
