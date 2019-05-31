import React, { useState } from 'react';
import { Route, Link } from 'react-router-dom';
import { Layout, Icon, Button } from 'antd';
import ButtonBack from '../ButtonBack';

const {
  Header,
} = Layout;

const HeaderApp = ({ loginFlag, handleLogin }) => {

  return (
    <div className="header-app">
      <Header className="user-layout__header">
        <div className="page">
          <Link to="/">
            <Icon component={() => <img className="user__icon-home" alt="pixabay.com" src="http://www.biz4u.co.il/wp-content/uploads/2016/05/pixabay.png" />} />
          </Link>
          <Route path="/:id" component={() => <ButtonBack />} />
          { !loginFlag && (
            <Button
              onClick={() => handleLogin(true)}
              style={{ marginLeft: '10px' }}
              type="link"
              href={`https://unsplash.com/oauth/authorize?redirect_uri=${process.env.REACT_APP_UNSPLASH_API_REDIRECT_URI}&response_type=code&scope=public+read_user+write_user+read_photos+write_likes+write_photos+write_followers+read_collections+write_collections&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`}
            >
              Login
            </Button>
          )}
          { loginFlag && <Button style={{ marginLeft: '10px' }} onClick={() => handleLogin(false)} type="link">Logout</Button>}
        </div>
      </Header>
    </div>
  );
};

export default HeaderApp;
