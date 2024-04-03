import React from "react";
const Spinner = (props) => {
  return (
    <div className='loader'>
      <div className='loader__bar'></div>
      <div className='loader__bar'></div>
      <div className='loader__bar'></div>
      <div className='loader__bar'></div>
      <div className='loader__bar'></div>
      <div className='loader__ball'></div>
    </div>
  );
};
export default Spinner;
