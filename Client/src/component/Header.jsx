import React, { useRef, useEffect, useState } from "react";
import "../views/component.css";
import { FaPowerOff } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";
import Avatar from "./Avatar";
import Img from "./Img";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Auth from "../Auth";
import axios from "axios";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Header = (props) => {
  const [password, setpassword] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [error, seterror] = useState('');
  const [image, setimage] = useState('');
  const [avatar, setavatar] = useState('');
  const submitPass = async (e) => {
    e.preventDefault();
    const data = { password, newPassword };

    try {
      const response = await axios.post(
        "http://localhost:3001/api/account/password",
        data,
      );
      setsetting(!setting);
      seterror(null);
      setnewPassword(null);
      setpassword(null);
      Auth.logOut();
      history.push("/");
    } catch (err) {
      seterror(err.response.data.message);
    }
  };
  const onimageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setimage(URL.createObjectURL(e.target.files[0]));
      setavatar(e.target.files[0]);
    }
  };
  const [nameuser, setnameuser] = useState(props.user.name);
  const [about, setabout] = useState(props.user.about || "");

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

  const Submitfun = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", nameuser);
    data.append("about", about);
    if (avatar) data.append("avatar", avatar, avatar.name);
    axios.post("http://localhost:3001/api/account", data).catch((err) => {
      console.log(err.response.data.message);
    });
  };

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
        <Avatar src={props.user.avatar} file={image} />
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
          <form
            onSubmit={(e) => Submitfun(e)}
            className=' mb-20 w-[90%]  flex h-full flex-col justify-center items-centern'
          >
            <label htmlFor='uploadFile1'>
              <input
                onChange={(e) => onimageChange(e)}
                type='file'
                id='uploadFile1'
                className='hidden'
              />
              <div className='flex justify-center items-center'>
                <Img src={props.user.avatar} file={image} />
                <div className='bgfile flex justify-center items-center cursor-pointer absolute rounded-full w-[190px] h-[190px]'>
                  <i className='text-5xl text-white fa-solid fa-cloud-arrow-up'></i>
                </div>
              </div>
            </label>

            <div className=' border-blue-500 border-b-2  mt-10  relative flex items-center'>
              <input
                value={nameuser}
                required
                onChange={(e) => {
                  setnameuser(e.target.value);
                }}
                className='  form-control w-full text-sm bg-gray-100 px-4 py-4 border-none  outline-none  '
                placeholder='Enter name'
              />
              <i className=' text-blue-500 absolute right-4 fa-solid fa-user-pen'></i>
            </div>
            <div className=' border-blue-500 border-b-2  mt-10  relative flex items-center'>
              <input
                value={about}
                onChange={(e) => {
                  setabout(e.target.value);
                }}
                className='  form-control w-full text-sm bg-gray-100 px-4 py-4 border-none  outline-none  '
                placeholder='Enter about'
              />
              <i className=' text-blue-500 absolute right-4 fa-solid fa-user-pen'></i>
            </div>
            <button
              type='submit'
              onClick={() => setOpennav(!opennav)}
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
          <form
            onSubmit={(e) => submitPass(e)}
            className=' mb-20 w-[90%]  flex h-full flex-col justify-center items-centern'
          >
            {error ? (
              <div class='bg-red-300 px-6 py-4 w-[100%] my-4 rounded-md text-lg flex items-center mx-auto max-w-lg'>
                <svg
                  viewBox='0 0 24 24'
                  class='text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3'
                >
                  <path
                    fill='currentColor'
                    d='M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z'
                  ></path>
                </svg>
                <span class='text-red-800'> Your password is invalid. </span>
              </div>
            ) : (
              ""
            )}
            <div className=' border-blue-500 border-b-2  mt-10  relative flex items-center'>
              <input
                required
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                className='  form-control w-full text-sm bg-gray-100 px-4 py-4 border-none  outline-none  '
                placeholder='Old Password'
              />
              <i className=' text-blue-500 absolute right-4 fa-solid fa-user-pen'></i>
            </div>
            <div className=' border-blue-500 border-b-2  mt-10  relative flex items-center'>
              <input
                required
                value={newPassword}
                onChange={(e) => setnewPassword(e.target.value)}
                className='  form-control w-full text-sm bg-gray-100 px-4 py-4 border-none  outline-none  '
                placeholder='New Password'
              />
              <i className=' text-blue-500 absolute right-4 fa-solid fa-user-pen'></i>
            </div>
            <button
              type='submit'
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
