import React from 'react';
import ReactLoading from 'react-loading';

const Loading = () => {
  return (
    <center className="loading-wrapper">
      <span>Loading</span>
      <ReactLoading type="cubes" color="#000" />
    </center>
  );
}


export default Loading;
