import React from 'react';
import { Button, Icon } from 'antd';
import { withRouter } from 'react-router-dom'
import { withLastLocation } from 'react-router-last-location';

const ButtonBack = withRouter(({ history, lastLocation }) => {
  console.log('111:::', lastLocation)
  if (!lastLocation) return false;
  console.log('222:::', lastLocation)
  return (<Button
      type='default'
      onClick={() => {
        history.push(lastLocation.pathname) 
      }}
    >
      <Icon type="left" /> Go back
    </Button>)
})

  export default withLastLocation(ButtonBack);