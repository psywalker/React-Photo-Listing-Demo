import React, { memo } from 'react';
import './index.scss';

const SpinnerPhotoCard = memo(() => (
  <div
    data-test="spinnerContainer"
    className="photocard-spinner"
  >
  <div class='sk-circle-bounce'>
    <div class='sk-child sk-circle-1'></div>
    <div class='sk-child sk-circle-2'></div>
    <div class='sk-child sk-circle-3'></div>
    <div class='sk-child sk-circle-4'></div>
    <div class='sk-child sk-circle-5'></div>
    <div class='sk-child sk-circle-6'></div>
    <div class='sk-child sk-circle-7'></div>
    <div class='sk-child sk-circle-8'></div>
    <div class='sk-child sk-circle-9'></div>
    <div class='sk-child sk-circle-10'></div>
    <div class='sk-child sk-circle-11'></div>
    <div class='sk-child sk-circle-12'></div>
  </div>
  </div>
));

export default SpinnerPhotoCard;
