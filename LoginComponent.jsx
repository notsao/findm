import { useState } from 'react';
import gSVG from './assets/google.svg';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/firebase'; // Make sure this path matches your Firebase config

function LoginComponent({ onSubmit }) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const { email, password } = formData;
        
        console.log("Form submitted with email:", email, "and password:", password);

        if (onSubmit) {
            console.log("onSubmit callback is provided");
            onSubmit(formData);
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('Logged in successfully:', userCredential);
        } catch (error) {
            console.error('Firebase error:', error.code, error.message);
        }

        setFormData({ email: '', password: '' });
    };

    const handleGauth = (e) => {
        e.preventDefault();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result)
            const token = credential.accessToken
            console.log(result)
        }). catch((error) => {
            console.error(error)
        })
        console.log("Google Auth is triggered with form data:", formData);
        setFormData({ email: '', password: '' });
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white flex flex-col justify-center items-center w-1/4 p-4 rounded-[20px] shadow h-1/2 ">
                <h2 className="mb-4 text-5xl font-bold">Login</h2>
                <form onSubmit={handleSubmit} className='flex flex-col w-1/4 md:w-[400px] space-y-4'>
                    <div>
                        <label htmlFor="email" className="w-1/2">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border p-2 w-full"
                            placeholder='Email'
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="border p-2 w-full"
                            placeholder='Password'
                            required
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                        Submit
                    </button>
                </form>
                <div className="inline-flex items-center justify-center w-full">
                    <hr className="w-[200px] h-1 my-8 bg-gray-200 border-0 rounded" />
                    <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2">
                        <span className="text-gray-700 dark:text-black">Or</span>
                    </div>
                    <hr className="w-[200px] h-1 my-8 bg-gray-200 border-0 rounded" />
                </div>

                <form  className='flex flex-col w-[400px] space-y-4 '>
                   <button onClick={handleGauth} className='border p-4 font-bold bg-blue-600 hover:bg-blue-900 ease-in-out duration-300 hover:text-white cursor-pointer flex flex-row items-center justify-center'>
                       <div><img src={gSVG} className='w-9 h-9 p-1' /> </div>
                       Sign in with Google
                   </button>
                </form>
            </div>
        </div>
    );
}

export default LoginComponent;
