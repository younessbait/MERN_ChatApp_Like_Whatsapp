import React, { useRef, useEffect, useState } from "react";
import "../views/component.css";
import { FaPowerOff } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";
import Avatar from "./Avatar";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Auth from "../Auth";
const Header = (props) => {
  const dropdownRef = useRef(null);
  const dropdsettingRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpennav(false);
    }
  };
  const handlesettingOutside = (event) => {
    if (
      dropdsettingRef.current &&
      !dropdsettingRef.current.contains(event.target)
    ) {
      setsetting(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("mousedown", handlesettingOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousedown", handlesettingOutside);
    };
  }, []);

  const history = useHistory();
  const [opennav, setOpennav] = useState(false);
  const [setting, setsetting] = useState(false);
  return (
    <div className=' w-[15%] bg-blue-500  h-screen flex justify-between items-center flex-col'>
      <div
        className='mt-5 cursor-pointer'
        onClick={() => {
          setOpennav(!opennav);
        }}
      >
        <Avatar avatar={props.user.avatar} />
      </div>
      <div className='mb-10  flex justify-center items-center flex-col '>
        <IoMdSettings
          onClick={() => {
            setsetting(!setting);
          }}
          size={35}
          className='mb-5 cursor-pointer text-white '
        />
        <Link
          onClick={() => {
            Auth.logOut();
            history.push("/");
          }}
        >
          <FaPowerOff size={30} className=' cursor-pointer text-white ' />
        </Link>
      </div>
      <div
        ref={dropdownRef}
        className={
          opennav
            ? "  shadow-2xl z-50 animate__animated animate__fadeInDownBig     bg-white absolute  right-0  w-[100%] h-screen "
            : "hidden "
        }
      >
        <div className=' flex  border-b-2 border-b-gray-200  justify-between  items-center bg-white w-full '>
          <h1 className=' ml-5 mt-5 mb-4 border-b-gray-200 text-2xl font-bold text-blue-500 text-center '>
            My Profile
          </h1>
          <IoIosCloseCircle
            onClick={() => {
              setOpennav(!opennav);
            }}
            size={30}
            className=' text-blue-500 cursor-pointer  mr-3'
          />
        </div>
        <div className='  flex h-full flex-col justify-center items-center'>
          <form className=' mb-20 w-[90%]  flex h-full flex-col justify-center items-centern'>
            <label htmlFor='uploadFile1'>
              <input type='file' id='uploadFile1' className='hidden' />
              <div className='flex justify-center items-center'>
                <img
                  className='w-[190px] h-[190px] cursor-pointer rounded-full'
                  src={
                    props.user.avatar ||
                    "https://dpwhatsapp.com/wp-content/uploads/2022/10/girl-profile-picture-07.webp"
                  }
                />
                <div className='bgfile flex justify-center items-center cursor-pointer absolute rounded-full w-[190px] h-[190px]'>
                  <i className='text-5xl text-white fa-solid fa-cloud-arrow-up'></i>
                </div>
              </div>
            </label>

            <div className=' border-blue-500 border-b-2  mt-10  relative flex items-center'>
              <input
                defaultValue={props.user.name}
                required
                className='  form-control w-full text-sm bg-gray-100 px-4 py-4 border-none  outline-none  '
                placeholder='Enter name'
              />
              <i className=' text-blue-500 absolute right-4 fa-solid fa-user-pen'></i>
            </div>
            <div className=' border-blue-500 border-b-2  mt-10  relative flex items-center'>
              <input
                defaultValue={props.user.email}
                required
                className='  form-control w-full text-sm bg-gray-100 px-4 py-4 border-none  outline-none  '
                placeholder='Enter email'
              />
              <i className=' text-blue-500 absolute right-4 fa-solid fa-user-pen'></i>
            </div>
            <div className=' border-blue-500 border-b-2  mt-10  relative flex items-center'>
              <input
                defaultValue={props.user.about}
                required
                className='  form-control w-full text-sm bg-gray-100 px-4 py-4 border-none  outline-none  '
                placeholder='Enter about'
              />
              <i className=' text-blue-500 absolute right-4 fa-solid fa-user-pen'></i>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                setOpennav(!opennav);
              }}
              // type='submit'
              className=' bg-blue-500 hover:bg-blue-400 p-3 mt-5 rounded-lg text-white font-bold text-xl'
            >
              save
            </button>
          </form>
        </div>
      </div>
      <div
        ref={dropdsettingRef}
        className={
          setting
            ? " shadow-2xl  z-50 animate__animated animate__fadeInDownBig bg-white absolute  right-0  w-full h-screen "
            : "hidden"
        }
      >
        <div className=' flex border-b-2 border-b-gray-200 justify-between  items-center bg-white w-full '>
          <h1 className=' ml-5 mt-5 mb-4 text-2xl font-bold text-blue-500 text-center '>
            Edit Password
          </h1>
          <IoIosCloseCircle
            onClick={() => {
              setsetting(!setting);
            }}
            size={30}
            className=' text-blue-500 cursor-pointer  mr-3'
          />
        </div>
        <div className='  flex h-full flex-col justify-center items-center'>
          <form className=' mb-20 w-[90%]  flex h-full flex-col justify-center items-centern'>
            <div className=' border-blue-500 border-b-2  mt-10  relative flex items-center'>
              <input
                required
                className='  form-control w-full text-sm bg-gray-100 px-4 py-4 border-none  outline-none  '
                placeholder='Old Password'
              />
              <i className=' text-blue-500 absolute right-4 fa-solid fa-user-pen'></i>
            </div>
            <div className=' border-blue-500 border-b-2  mt-10  relative flex items-center'>
              <input
                required
                className='  form-control w-full text-sm bg-gray-100 px-4 py-4 border-none  outline-none  '
                placeholder='New Password'
              />
              <i className=' text-blue-500 absolute right-4 fa-solid fa-user-pen'></i>
            </div>
            <div className=' border-blue-500 border-b-2  mt-10  relative flex items-center'>
              <input
                required
                className='  form-control w-full text-sm bg-gray-100 px-4 py-4 border-none  outline-none  '
                placeholder='confirm password'
              />
              <i className=' text-blue-500 absolute right-4 fa-solid fa-user-pen'></i>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                setsetting(!setting);
              }}
              // type='submit'
              className=' bg-blue-500 hover:bg-blue-400 p-3 mt-5 rounded-lg text-white font-bold text-xl'
            >
              save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Header;
