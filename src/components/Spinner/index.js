import React from 'react';
import './Spinner.css';

const Spinner = () => (
  <div className="site-spinner">
    <div className="lds-ring">
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
    </div>
  </div>
);

export default Spinner;
