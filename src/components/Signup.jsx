import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {Button, Input, Logo} from './index.js'
import authService from '../appwrite/auth'
import {useForm} from 'react-hook-form'
import {login} from '../features/authSlice'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const create = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const user = await authService.getCurrentUser();

                if(user) dispatch(login(user));
                navigate("/")
            }
        } catch (error) {
            setError("A user with the same id, email, already exists.",error)
        }
    }

    return (
        <div className=" flex items-center justify-center min-h-screen ">
            <div className="mx-auto w-full max-w-lg bg-white rounded-2xl p-10 shadow-lg border border-gray-700 text-black bg-opacity-10 backdrop-blur-xl sm:p/10">
                <div className=" flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-3xl font-semibold leading-snug tracking-wide">Sign up to create an account</h2>
                <p className="mt-2 text-center text-base text-gray-600">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-black-500 transition duration-300 hover:text-blue-500 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-6 text-center">{error}</p>}
    
                <form onSubmit={handleSubmit(create)} className="mt-6">
                    <div className='space-y-6'>
                        <Input
                            label="Full Name : "
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Email ID  : "
                            placeholder="Enter your email "
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Enter a valid email address",
                                }
                            })}
                        />
                        <Input
                            label="Password : "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button type="submit" className="w-full py-3 text-lg rounded-lg bg-blue-500 hover:bg-blue-600 transition-all duration-300">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
    
}

export default Signup
// TODO