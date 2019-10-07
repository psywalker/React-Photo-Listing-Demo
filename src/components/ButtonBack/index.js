import React from 'react';
import { Button, Icon } from 'antd';
import { withRouter } from 'react-router-dom';
import { withLastLocation } from 'react-router-last-location';
import './index.scss';

export const ButtonBack = withRouter(({ history, lastLocation }) => {
  if (!lastLocation) return false;
  return (
    <Button
      data-test="btnBack"
      className="btn-back"
      type="default"
      onClick={() => {
        history.push(lastLocation.pathname);
      }}
    >
      <Icon type="left" />
      Go back
    </Button>
  );
});

export default withLastLocation(ButtonBack);
