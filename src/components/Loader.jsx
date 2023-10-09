import React from 'react';
import { Audio } from 'react-loader-spinner';

const loader = () => {
  return (
    <div>
      <Audio
        height={80}
        width={80}
        radius={9}
        color="green"
        ariaLabel="three-dots-loading"
        wrapperStyle="" // Set to an empty string or custom styles
        wrapperClass="" // Set to an empty string or custom class
      />
    </div>
  );
};

export default loader;
