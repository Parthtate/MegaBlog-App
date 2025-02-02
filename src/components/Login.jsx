import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Input, Logo } from './index';
import { login as authlogin } from '../features/authSlice';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';

// function Login() {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { register, handleSubmit } = useForm();
//     const [error, setError] = useState("");

//     const login = async (data) => {
//         setError("");
//         try {
//             const session = await authService.login(data);
//             if (session) {
//                 const userData = await authService.getCurrentUser();

//                 if (userData) {
//                     dispatch(featuredLogin(userData));
//                     navigate("/");
//                 }
//             }
//         } catch (error) {
//             setError("Invalid email or password.", error);
//         }
//     }
        
//     }
//     return (
//         <div className="flex items-center justify-center min-h-screen px-4">
//             <div className="w-full max-w-lg bg-white rounded-2xl p-10 shadow-lg border border-gray-700 text-black bg-opacity-10 backdrop-blur-xl">
                
//                 {/* Logo */}
//                 <div className="mb-4 flex justify-center">
//                     <span className="inline-block w-full max-w-[180px]">
//                         <Logo width="100%" />
//                     </span>
//                 </div>

//                 <h2 className="text-center text-4xl font-semibold leading-snug tracking-wide">
//                     {/* Welcome Back */} Sign in to your account
//                 </h2>

//                 <p className="mt-2 text-center text-base text-gray-400">
//                 Don&apos;t have any account?&nbsp;
//                     <Link 
//                         to="/signup" 
//                         className="font-medium text-black ml-1 transition duration-300 hover:text-blue-400 hover:underline">
//                         Sign Up
//                     </Link>
//                 </p>

//                 {/* Display Error Message */}
//                 {error && <p className="text-red-500 text-center mt-4">{error}</p>}

//                 {/* Login Form */}
//                 <form onSubmit={handleSubmit(login)} className="mt-6">
//                     <div className="space-y-5">
                        
//                         {/* Email Input */}
//                         <Input
//                             label="Email Address : "
//                             placeholder="Enter your email"
//                             type="email"
//                             {...register("email", {
//                                 required: true,
//                                 validate: {
//                                     matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
//                                     "Email address must be a valid address",
//                                 }
//                             })}
//                         />

//                         {/* Password Input */}
//                         <Input
//                             label="Password : "
//                             type="password"
//                             placeholder="Enter your password"
//                             {...register("password", {
//                                 required: true,
//                                 pattern: {
//                                     value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
//                                     message: "Password must be at least 8 characters long with an uppercase, lowercase, and number",
//                                 },
//                             })}
//                         />

//                         {/* Submit Button */}
//                         <Button 
//                             type="submit" 
//                             className="w-full py-3 text-lg rounded-lg bg-blue-500 hover:bg-blue-600 transition-all duration-300"
//                         >
//                             Sign in
//                         </Button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// export default Login;

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const login = async (data) => {
    setError("");

    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();

        if (userData) {
          dispatch(authlogin(userData));

          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
return (
  <div className="pt-10 pb-10 text-black flex items-center justify-center w-full">
  <div
    className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
  >
    <div className="mb-2 flex justify-center">
      <span className="inline-block w-full max-w-[100px]">
        <Logo width="100%" />
      </span>
    </div>
    <h2 className="text-center text-2xl font-bold leading-tight">
      Sign in to your account
    </h2>
    <p className="mt-2 text-center text-base text-black/60">
      Don&apos;t have any account?&nbsp;
      <Link
        to="/signup"
        className="font-medium text-primary transition-all duration-200 hover:underline"
      >
        Sign Up
      </Link>
    </p>
    {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

    <form onSubmit={handleSubmit(login)} className="mt-8">
      <div className="space-y-5 text-black">
        <div>
          <Input
          label="Email ID : "
            id="email"
            type="email"
            placeholder="Enter your Email"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />
        </div>
        <div>
          <Input
          label="Password : "
            id="password"
            placeholder="Enter your Password"
            type="password"
            {...register("password", {
              required: true,
            })}
          />
        </div>
        <Button type="submit" className="w-full">
          Log In
        </Button>
      </div>
    </form>
  </div>
</div>
)
    
}

export default Login;
