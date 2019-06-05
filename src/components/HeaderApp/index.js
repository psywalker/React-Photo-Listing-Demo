import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link, withRouter } from 'react-router-dom';
import {
  Layout,
  Icon,
  Button,
  Row,
  Col,
} from 'antd';
import { withLastLocation } from 'react-router-last-location';
import { connect } from 'react-redux';
import { logoutAction } from '../../actions';
import ButtonBack from '../ButtonBack';
import './index.css';

const {
  Header,
} = Layout;

const HeaderApp = withRouter((props) => {
  const { history, login, logoutAction } = props;
  const handleLoguotHeader = () => {
    logoutAction();
    window.localStorage.clear();
    history.push('/');
  };
  return (
    <div className="header-app">
      <Header className="user-layout__header">
        <div className="page">
          <Row type="flex" justify="justify">
            <Col span={12}>
              <Link to="/">
                <Icon component={() => <img className="user__icon-home" alt="pixabay.com" src="http://www.biz4u.co.il/wp-content/uploads/2016/05/pixabay.png" />} />
              </Link>
              <Route path="/:id" component={() => <ButtonBack />} />

              { !login.profileName && (
                <Button
                  style={{ marginLeft: '10px' }}
                  type="link"
                  href={`https://unsplash.com/oauth/authorize?redirect_uri=${process.env.REACT_APP_UNSPLASH_API_REDIRECT_URI}&response_type=code&scope=public+read_user+write_user+read_photos+write_likes+write_photos+write_followers+read_collections+write_collections&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`}
                >
                  Login
                </Button>
              )}  
              { login.profileName && (
                <span>
                  <Button style={{ marginLeft: '10px' }} type="link" onClick={handleLoguotHeader}>Logout</Button>
                </span>
              )}
            </Col>

            <Col span={1} push={11}>
              { login.profileName && (
                <Link to="/profile">
                  <Icon component={() => <img className="user-avatar" alt="" src={`${login.profilePhotoUrl}`} />} />
                </Link>
              )}
            </Col>
          </Row>
        </div>
      </Header>
    </div>
  );
});

HeaderApp.propTypes = {
  logoutAction: PropTypes.func,
  login: PropTypes.shape({
    profilePhotoUrl: PropTypes.string,
    profileName: PropTypes.string,
    profileEmail: PropTypes.string,
    fetching: PropTypes.bool,
  }),
};
HeaderApp.defaultProps = {
  logoutAction: () => {},
  login: {
    profilePhotoUrl: '',
    profileName: '',
    profileEmail: '',
    fetching: false,
  }
};


const mapStateToProps = (state) => {
  const { login } = state;
  return { login };
};

const mapDispatchToProps = ({
  logoutAction,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withLastLocation(HeaderApp));
