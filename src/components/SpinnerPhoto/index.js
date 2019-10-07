import React, { memo } from 'react';
import './index.scss';

const SpinnerPhoto = memo(() => (
  <div
    data-test="spinnerPhotoContainer"
    className="spinner-photo"
  >
    <div
      data-test="spinnerPhotoInner"
      className="lds-ring"
    >
      <div data-test="spinnerPhotoInnerItem">&nbsp;</div>
      <div data-test="spinnerPhotoInnerItem">&nbsp;</div>
      <div data-test="spinnerPhotoInnerItem">&nbsp;</div>
      <div data-test="spinnerPhotoInnerItem">&nbsp;</div>
    </div>
  </div>
));

export default SpinnerPhoto;
