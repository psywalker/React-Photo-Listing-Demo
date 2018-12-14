import React from 'react';
import { Button, Icon } from 'antd';
import { withRouter } from 'react-router-dom'
import { withLastLocation } from 'react-router-last-location';

const ButtonBack = withRouter(({ history, lastLocation }) => {
  console.log('1111:::', history, lastLocation)
  if (history.action === 'POP' || history.location.pathname === '/' ) return false;
  return (<Button
      type='default'
      onClick={() => {
        history.push(history.goBack()) 
      }}
    >
      <Icon type="left" /> Go back
    </Button>)
})

  export default withLastLocation(ButtonBack);