import React from "react";

const Avatar = (props) => {
  let src = props.src
    ? `http://localhost:3001/uploads/${props.src}`
    : "https://dpwhatsapp.com/wp-content/uploads/2022/10/girl-profile-picture-07.webp";
  return (
    <img
      src={props.file || src}
      className='w-14 h-14 rounded-full border-4 border-white p-0.5'
    />
  );
};
export default Avatar;
