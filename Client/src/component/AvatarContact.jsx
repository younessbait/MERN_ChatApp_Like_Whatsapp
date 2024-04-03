import React from "react";

const AvatarContact = (props) => {
  return (
    <div className='relative inline-block'>
      <img
        src={
          `http://localhost:3001/uploads/${props.avatar}` ||
          "https://dpwhatsapp.com/wp-content/uploads/2022/10/girl-profile-picture-07.webp"
        }
        className='w-14 h-14 rounded-full border-2 border-blue-500 p-0.5'
      />
      {props.online === true ? (
        <span className='absolute flex h-3 w-3 top-1 right-0'>
          <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
          <span className='relative inline-flex rounded-full h-3 w-3 bg-green-400'></span>
        </span>
      ) : (
        ""
      )}
    </div>
  );
};
export default AvatarContact;
