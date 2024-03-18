import React, { Component } from "react";
import "./component.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Auth from "../Auth";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default class Login extends Component {
    state = { email: "", password: "", typeInput: false };
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    onSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        const data = { email, password };

        try {
            const response = await axios.post(
                "http://localhost:3001/api/auth/login/",
                data,
            );
            Auth.login(response.data);
            this.props.history.push("/"); // Assuming you are using React Router and history is passed as a prop
        } catch (err) {
            toast.error(err.response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Slide,
            });
        }
    };
    togglePasswordVisibility = () => {
        this.setState((prevState) => ({
            typeInput: !prevState.typeInput,
        }));
    };

    render() {
        return (
            <div className='font-[sans-serif] fixed w-full h-screen flex justify-center items-center  '>
                <ToastContainer />
                <div className=' overflow-hidden hidden lg:block h-screen w-[60%]    '>
                    <div className=' w-[100%] h-screen  bg-blue-500  flex flex-col justify-center items-center'>
                        <div className=' flex justify-center items-center'>
                            <i className='text-5xl text-white  fa-regular fa-comments'></i>
                            <h1 className='animate__animated animate__bounceInLeft  animate__delay-0s text-center p-5 text-3xl font-extrabold text-white '>
                                Chat App
                            </h1>
                        </div>
                        <p className='animate__animated animate__bounceInRight animate__delay-0s text-lg mx-5 my-5 font-bold  text-white '>
                            Join us now and enjoy connecting and interacting with the
                            world around you easily and conveniently through our chat
                            platform. Thank you for your trust in us, and we hope you have
                            an enjoyable and beneficial experience!
                        </p>
                    </div>
                </div>
                <div className='  flex justify-center items-center  flex-col h-screen w-[100%] '>
                    <form
                        onSubmit={this.onSubmit}
                        className='max-w-lg max-md:mx-auto w-full p-6'
                    >
                        <div className=' text-center mb-10'>
                            <h3 className='text-4xl text-blue-500 font-extrabold'>
                                Log in{" "}
                            </h3>
                        </div>
                        <div className='mt-6'>
                            <label className='text-[15px] mb-3 block'>Email</label>
                            <div className=' border-blue-500 border-b-2   relative flex items-center'>
                                <input
                                    name='email'
                                    type='email'
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    required
                                    className='  form-control w-full text-sm bg-gray-100 px-4 py-4 border-none  outline-none  '
                                    placeholder='Enter email'
                                />
                                <i className=' text-blue-500 absolute right-4 fa-regular fa-envelope'></i>
                            </div>
                        </div>
                        <div className='mt-6'>
                            <label className='text-[15px] mb-3 block'>Password</label>
                            <div className=' border-blue-500 border-b-2   relative flex items-center'>
                                <input
                                    name='password'
                                    type={this.state.typeInput ? "text" : "password"}
                                    required
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    className='form-control w-full text-sm bg-gray-100 px-4 py-4 border-none   outline-none  '
                                    placeholder='Enter password'
                                />
                                {this.state.typeInput ? (
                                    <i
                                        onClick={this.togglePasswordVisibility}
                                        className='text-blue-500 absolute right-4 cursor-pointer fa-sharp fa-solid fa-eye'
                                    ></i>
                                ) : (
                                    <i
                                        onClick={this.togglePasswordVisibility}
                                        className=' text-blue-500 absolute right-4 cursor-pointer fa-solid fa-eye-slash'
                                    ></i>
                                )}
                            </div>
                        </div>
                        <div className='flex items-center gap-4 justify-between mt-4'></div>
                        <div className='mt-5'>
                            <button
                                type='submit'
                                className='w-full p-3 text-white text-xl bg-blue-500 hover:bg-blue-400 font-semibold rounded'
                            >
                                Log in
                            </button>
                        </div>
                        <p className='text-sm mt-10 text-center'>
                            Don't have an account{" "}
                            <Link
                                to={"/register"}
                                className=' underline text-blue-700 font-semibold hover:underline ml-1'
                            >
                                Log in here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}
