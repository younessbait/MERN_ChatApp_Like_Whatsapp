import React from "react";

const Imgprofile = (props) => {
  let src = props.src
    ? `http://localhost:3001/uploads/${props.src}`
    : "https://dpwhatsapp.com/wp-content/uploads/2022/10/girl-profile-picture-07.webp";
  return (
    <img
      src={src}
      className='mb-5 w-[190px] h-[190px] cursor-pointer rounded-full'
    />
  );
};
export default Imgprofile;
