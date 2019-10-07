import React, { memo } from 'react';
import './Spinner.css';

const Spinner = memo(() => (
  <div
    data-test="spinnerContainer"
    className="site-spinner"
  >
    <div
      data-test="spinnerInner"
      className="lds-ring"
    >
      <div data-test="spinnerInnerItem">&nbsp;</div>
      <div data-test="spinnerInnerItem">&nbsp;</div>
      <div data-test="spinnerInnerItem">&nbsp;</div>
      <div data-test="spinnerInnerItem">&nbsp;</div>
    </div>
  </div>
));

export default Spinner;
