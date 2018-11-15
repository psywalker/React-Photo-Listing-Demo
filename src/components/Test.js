import React from 'react';

function func() {
  return 1;
}

const Test = () => (
  <div className="test" onClick={func}>
    Text
  </div>
);

export default Test;
