import React, { memo } from 'react';
import './Spinner.css';

const Spinner = memo(() => (
  <div className="site-spinner">
    <div className="lds-ring">
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
    </div>
  </div>
));

export default Spinner;
