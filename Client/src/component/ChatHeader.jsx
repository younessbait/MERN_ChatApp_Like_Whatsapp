import React, { useRef, useEffect, useState } from "react";
import Avatar from "./Avatar";
import { BsThreeDots } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";
import moment from "moment";
const ChatHeader = (props) => {
    const [opennav, setopnen] = useState(false);
    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setopnen(false);
        }
    };

    const status = () => {
        if (props.typing) return "Write now ...";
        if (props.contact.online === true) return "Online";
        if (props.contact.online) return moment(props.contact.online).fromNow();
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <div className='relative h-[11.3%] flex  items-center  bg-blue-500'>
            <div ref={dropdownRef} className=' mx-5 w-full'>
                <div className='  flex justify-between items-center'>
                    <div className='flex justify-start items-center'>
                        <div className=' '>
                            {" "}
                            <img
                                src={`http://localhost:3001/uploads/${props.contact.avatar}`}
                                className='w-14 h-14 rounded-full border-4 border-white p-0.5'
                            />
                            {/* <Avatar avatar={props.contact.avatar} /> */}
                        </div>
                        <div className=' ml-5 flex flex-col justify-center items-start'>
                            <h1 className='capitalize font-bold text-white'>
                                {props.contact.name}
                            </h1>
                            <h1 className='  text-gray-50'>{status()}</h1>
                        </div>
                    </div>
                    <BsThreeDots
                        onClick={() => {
                            setopnen(!opennav);
                        }}
                        className=' cursor-pointer text-2xl text-white'
                    />
                </div>
                <div
                    className={
                        !opennav
                            ? " hidden"
                            : "  shadow-2xl animate__animated animate__fadeInRight top-0 right-0 z-20 absolute h-screen bg-white w-[45%]"
                    }
                >
                    <div className=' flex  border-b-2 border-b-gray-200  justify-between  items-center bg-white w-full '>
                        <h1 className=' ml-5 mt-5 mb-4 border-b-gray-200 text-2xl font-bold text-blue-500 text-center '>
                            Show Profile
                        </h1>
                        <IoIosCloseCircle
                            onClick={() => {
                                setopnen(!opennav);
                            }}
                            size={30}
                            className=' text-blue-500 cursor-pointer  mr-3'
                        />
                    </div>
                    <div className=' flex flex-col justify-center items-center bg-white w-full h-[70%]'>
                        <img
                            className='mb-5 w-[190px] h-[190px] cursor-pointer rounded-full'
                            src={
                                `http://localhost:3001/uploads/${props.contact.avatar}` ||
                                "https://dpwhatsapp.com/wp-content/uploads/2022/10/girl-profile-picture-07.webp"
                            }
                        />
                        <h1 className='mb-2 capitalize text-2xl  font-bold text-blue-500'>
                            {props.contact.name}
                        </h1>
                        <h1 className=' mb-2 text-gray-800'>{props.contact.email}</h1>
                        <h1 className='capitalize text-gray-500'>{props.contact.about}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatHeader;
