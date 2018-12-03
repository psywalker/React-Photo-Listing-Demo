import React from 'react';
import { withRouter } from 'react-router-dom'
import { withLastLocation } from 'react-router-last-location';

const Button = withRouter(({ history }) => (
    <button
      type='button'
      onClick={() => { history.push('/') }}
    >
      Click Me!
    </button>
  ))

  export default withLastLocation(Button);