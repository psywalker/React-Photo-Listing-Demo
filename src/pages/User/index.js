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

class User extends PureComponent {
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
      <div className="user-container">
        { isUserFetching && (<Spinner />)}
        { !isUserFetching && !requestError && (
          <div>
            <Row style={{ display: 'flex', justifyContent: 'center' }}>
              <Col>
                <img
                  className="user-card__first-img"
                  alt="example"
                  src={userFirstPhoto}
                />
                <div className="user-card__photo-wrap">
                  <Avatar size={150} src={userPhoto} />
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
                <div className="user-tabs">
                  <Tabs
                    className="user-tabs__item"
                    defaultActiveKey="1"
                  >
                    <TabPane
                      tab="My photos"
                      key="1"
                      className="user-tabs__pane"
                    >
                      <SmallPhotoListing
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
                      <UserStatistic userId={match.params.id} />
                    </TabPane>
                  </Tabs>
                </div>
              </Col>
            </Row>
          </div>
        )}
        { !isUserFetching && requestError && (
        <Error text="Sorry, user is not found" />
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
  match: {},
};

const mapStateToProps = (state) => {
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
