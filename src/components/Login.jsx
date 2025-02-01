import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Input, Logo } from './index';
import { login as featuredLogin } from '../features/authSlice';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const login = async (data) => {
        setError(""); // Reset error before each attempt

        try {
            // Attempt to log in
            const session = await authService.login(data);

            if (session) {
                // Fetch user details after successful login
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(featuredLogin(userData));
                    navigate("/");
                }
            }
        } catch (error) {
            setError(error.message || "Invalid email or password. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <div className="w-full max-w-lg bg-white rounded-2xl p-10 shadow-lg border border-gray-700 text-black bg-opacity-10 backdrop-blur-xl">
                
                {/* Logo */}
                <div className="mb-4 flex justify-center">
                    <span className="inline-block w-full max-w-[180px]">
                        <Logo width="100%" />
                    </span>
                </div>

                <h3 className="text-center text-4xl font-semibold leading-snug tracking-wide">
                    Welcome Back
                </h3>

                <p className="mt-2 text-center text-base text-gray-400">
                    Don't have an account?
                    <Link 
                        to="/signup" 
                        className="font-medium text-black ml-1 transition duration-300 hover:text-blue-400 hover:underline">
                        Sign Up
                    </Link>
                </p>

                {/* Display Error Message */}
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}

                {/* Login Form */}
                <form onSubmit={handleSubmit(login)} className="mt-6">
                    <div className="space-y-6">
                        
                        {/* Email Input */}
                        <Input
                            label="Email Address : "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[\w\.-]+@[\w\.-]+\.\w{2,4}$/,
                                    message: "Enter a valid email address",
                                },
                            })}
                        />

                        {/* Password Input */}
                        <Input
                            label="Password : "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: "Password is required",
                                pattern: {
                                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                                    message: "Password must be at least 8 characters long with an uppercase, lowercase, and number",
                                },
                            })}
                        />

                        {/* Submit Button */}
                        <Button 
                            type="submit" 
                            className="w-full py-3 text-lg rounded-lg bg-blue-500 hover:bg-blue-600 transition-all duration-300"
                        >
                            Sign in
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
