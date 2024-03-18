import React from "react";

const Avatar = (props) => {
    return (
        <img
            src={
                props.avatar ||
                "https://dpwhatsapp.com/wp-content/uploads/2022/10/girl-profile-picture-07.webp"
            }
            className='w-14 h-14 rounded-full border-4 border-white p-0.5'
        />
    );
};
export default Avatar;
