import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GoogleLogo from '../../assets/svgs/googleLogo.svg';
import SignupImg from '../../assets/svgs/signupImg.svg';

import { toast } from 'react-toastify';

import { AuthContext } from '../../Context/AuthProvider'
import { updateProfile } from 'firebase/auth';

export function Signup() {

    const { register, RegisterWithGoogle } = useContext(AuthContext);
    const [error, setError] = useState("error");

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";

    const handleSignUp = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        try {
            const userCredential = await register(email, password);
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: name
            });

            toast.success("User Registered Successfully");
            navigate(from, { replace: true });
        } catch (error) {
            const errorMessage = error.message;
            setError(errorMessage);
            toast.error(errorMessage)
        }
    };


    const handleGoogleRegister = () => {
        RegisterWithGoogle()
            .then((result) => {
                const user = result.user;
                toast.success("User Registered Successfully");
                navigate(from, { replace: true });
            })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage);
                alert(errorMessage);
            })
    }

    return (
        <>
            <div className="bg-white relative lg:py-4 overflow-y-hidden">
                <div className="flex flex-col items-center justify-between p-2 max-w-7xl xl:px-2 lg:flex-row">
                    <div className="flex flex-col items-center w-full lg:p-4 lg:flex-row">
                        <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12">
                            <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-10">
                                <img src="https://res.cloudinary.com/macxenon/image/upload/v1631570592/Run_-_Health_qcghbu.png" alt="Signup" className="btn-" />
                            </div>
                        </div>
                        <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
                            <div className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
                                <p className="w-full text-4xl font-medium text-center leading-snug font-serif">Sign up for an account</p>
                                <div className="w-full mt-6 relative space-y-6">
                                    <form onSubmit={handleSignUp} className='space-y-6'>
                                        <div className="relative">
                                            <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">Name</p>
                                            <input name="name" id='name' placeholder="Enter Name" type="text" className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md" />
                                        </div>
                                        <div className="relative">
                                            <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">Email</p>
                                            <input placeholder="Enter Email" id='email' name='email' type="text" className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md" />
                                        </div>
                                        <div className="relative">
                                            <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">Password</p>
                                            <input id='password' name='password' placeholder="Enter Password" type="password" className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md" />
                                        </div>
                                        <div className="relative">
                                            <button type="submit" className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500 rounded-lg transition duration-200 hover:bg-indigo-600 ease">Submit</button>
                                        </div>
                                    </form>


                                    <div className="flex items-center justify-center w-full mt-6">
                                        <hr className="w-full border-gray-300" />
                                        <span className="mx-4 text-gray-500 text-sm">Or</span>
                                        <hr className="w-full border-gray-300" />
                                    </div>

                                    <div className="flex items-center justify-center w-full">
                                        <button onClick={handleGoogleRegister} className="flex items-center justify-center transition ease-in-out delay-50 px-3 py-2.5 space-x-2 bg-white border border-slate-600 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 focus:ring-opacity-50">


                                            <img src={GoogleLogo} alt="" srcset="" />






                                            <span className="text-gray-700 font-medium">Continue with Google</span>
                                        </button>
                                    </div>

                                    <p className="text-center text-[14px]">Already have an account? <Link to="/login" className="text-blue-800 text-sm"> Log In</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <SignupImg /> */}
            <img src={SignupImg} alt="" srcset="" />
        </>
    )
}
