import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/firebase';

function SignUp() {
    const [formValues, setFormValues] = useState({
        username: '',
        email: '',
        name: '',
        password: '',
        confirmpassword: ''
    });

    const handleFormInput = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { password, confirmpassword, email } = formValues;

        if (password !== confirmpassword) {
            console.error('Passwords do not match');
            return; // Exit the function if passwords don't match
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                console.log('User signed up:', userCredentials.user);
            })
            .catch((error) => {
                console.error(error.code, error.message);
            });

        console.log(formValues);
    };

    return (
        <div className='w-full h-auto flex items-center justify-center'>
            <div className='w-1/2 border-2 border-gray-300 p-6 flex flex-col items-center'>
                <h2 className='text-2xl font-bold mb-6 text-white'>Create a new account</h2>
                <form onSubmit={handleSubmit} className='w-full'>
                    <div className='text-center font-bold'>Create an account</div>
                    <div className='flex flex-row w-full justify-center items-center'>
                        <div className='flex flex-col p-4'>
                            <label className='text-white'>Username</label>
                            <input
                                className='border-black rounded-md border-2 p-3'
                                type='text'
                                name='username'
                                placeholder='Username'
                                value={formValues.username}
                                onChange={handleFormInput}
                            />
                        </div>
                        <div className='flex flex-col p-4'>
                            <label className='text-white'>Email</label>
                            <input
                                className='border-black rounded-md border-2 p-3'
                                type='email'
                                name='email'
                                placeholder='Email'
                                value={formValues.email}
                                onChange={handleFormInput}
                            />
                        </div>
                    </div>
                    <div className='flex flex-row justify-center items-center'>
                        <div className='flex flex-col p-4'>
                            <label className='text-white'>Password</label>
                            <input
                                className='border-black rounded-md border-2 p-3'
                                type='password'
                                name='password'
                                placeholder='Password'
                                value={formValues.password}
                                onChange={handleFormInput}
                            />
                        </div>
                        <div className='flex flex-col p-4'>
                            <label className='text-white'>Confirm Password</label>
                            <input
                                className='border-black rounded-md border-2 p-3'
                                type='password'
                                name='confirmpassword'
                                placeholder='Confirm Password'
                                value={formValues.confirmpassword}
                                onChange={handleFormInput}
                            />
                        </div>
                    </div>
                    <div className='flex justify-center items-center'>
                        <button type='submit' className='mt-4 bg-blue-500 text-white py-2 px-4 rounded'>
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
