import React, { memo } from 'react';
import './index.scss';

const SpinnerPhoto = memo(() => (
  <div className="spinner-photo">
    <div className="lds-ring">
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
    </div>
  </div>
));

export default SpinnerPhoto;
