import React, { useEffect, useState } from "react";
import AvatarContact from "./AvatarContact";
import moment from "moment";
const UserContact = (props) => {
    return (
        <div
            onClick={props.onClick}
            className={
                props.isSelected
                    ? "border-l-blue-500 bg-gray-200 flex p-2   border-l-4      justify-between  items-center  cursor-pointer   border-b-2 border-b-gray-200 "
                    : `flex p-2  border-l-4 border-l-white  hover:border-l-blue-500  hover:bg-gray-200    justify-between  items-center  cursor-pointer  bg-white border-b-2 border-b-gray-200  `
            }
        >
            <div className=' flex '>
                <AvatarContact
                    avatar={props.contact.avatar}
                    online={props.contact.online}
                />
                <div>
                    <div className=' ml-3'>
                        <h1 className='capitalize mb-2 font-sans font-bold '>
                            {props.contact.name}
                        </h1>
                        <p
                            className={
                                props.length == 0 ? " capitalize" : "lastmessage capitalize"
                            }
                        >
                            {props.message
                                ? props.message.content
                                : "click to start the conversation"}
                        </p>
                    </div>
                </div>
            </div>
            <div className=' flex flex-col justify-center items-center'>
                <h1>
                    {props.message ? moment(props.message.date).format("hh:mm a") : ""}
                </h1>
                <h1
                    className={
                        props.unseen == 0
                            ? "hidden"
                            : " mt-1 font-bold text-white text-center bg-green-400 p-[1px] w-[25px] rounded-lg  "
                    }
                >
                    {props.unseen}
                </h1>
            </div>
        </div>
    );
};

export default UserContact;
