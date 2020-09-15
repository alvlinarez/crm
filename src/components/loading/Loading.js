import React from 'react';
import Loader from 'react-loader-spinner';

const Loading = () => {
  return (
    <div className="flex items-center justify-center mt-10">
      <Loader type="Oval" color="#718096" height={120} width={120} />
    </div>
  );
};

export default Loading;
