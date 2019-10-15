import React, { memo } from 'react';
import './index.scss';

const SpinnerPhotoCard = memo(() => (
  <div
    data-test="spinnerContainer"
    className="photocard-spinner"
  >
  <div className='sk-circle-bounce'>
    <div className='sk-child sk-circle-1'></div>
    <div className='sk-child sk-circle-2'></div>
    <div className='sk-child sk-circle-3'></div>
    <div className='sk-child sk-circle-4'></div>
    <div className='sk-child sk-circle-5'></div>
    <div className='sk-child sk-circle-6'></div>
    <div className='sk-child sk-circle-7'></div>
    <div className='sk-child sk-circle-8'></div>
    <div className='sk-child sk-circle-9'></div>
    <div className='sk-child sk-circle-10'></div>
    <div className='sk-child sk-circle-11'></div>
    <div className='sk-child sk-circle-12'></div>
  </div>
  </div>
));

export default SpinnerPhotoCard;
