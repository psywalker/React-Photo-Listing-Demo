import React from 'react';
import { MDBBtn } from "mdbreact";
import { withRouter } from 'react-router-dom'
import { withLastLocation } from 'react-router-last-location';

const ButtonBack = withRouter(({ history, lastLocation }) => {
  if (!lastLocation) return false;
  return (<MDBBtn
      color="danger"
      type='button'
      onClick={() => {
        history.push(lastLocation.pathname) 
      }}
    >
      ← Come back
    </MDBBtn>)
})

  export default withLastLocation(ButtonBack);