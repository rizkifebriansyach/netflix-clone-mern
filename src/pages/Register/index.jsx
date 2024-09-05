import React, { useState } from 'react'
import { JUMBOTRON_IMAGE } from '../../constants/listAsset'
import { GoChevronLeft } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'
import { useAtom } from 'jotai'
import { emailAtom } from '../../jotai/atoms'
import { auth } from '../../utils/firebase'
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DefaultLayout from '../../components/layout/DefaultLayout'
import { apiInstanceExpress } from '../../utils/apiInstance'

const Register = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useAtom(emailAtom)
    const [password, setPassword] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const register = await createUserWithEmailAndPassword(auth, email, password)
            console.log({ register })
            if (register) {
                await signOut(auth)
                const addUser = await apiInstanceExpress.post("sign-up", { email, password })
                if (addUser.status === 201) {
                    toast("Register Success")
                    setTimeout(() => {
                        setIsLoading(false)
                        navigate("/login")
                    }, 2000)
                }
            }
        } catch (error) {
            setIsLoading(false)
            toast(error.message)
        }


    }

    return (
        <DefaultLayout>
            <ToastContainer
                autoClose={2000}
                position='top-center'
                theme='dark' />
            <img
                src={JUMBOTRON_IMAGE}
                className='image-full h-[100vh] w-full object-cover opacity-70'
            />
            <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-black/80 px-8 py-16 rounded-xl max-w-xl w-full'>
                <form className='flex flex-col gap-4'>
                    <div className='text-white font-semibold mb flex items-center gap-2'>
                        <GoChevronLeft
                            size={28}
                            className='text-slate-200 hover:text-white cursor-pointer'
                            onClick={() => navigate("/")}
                        />
                        <h3>Sign Up</h3>
                    </div>
                    <div className='relative'>
                        <input
                            value={email ? email : ""}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            type='email'
                            className='w-full p-4 bg-black/50 rounded-md border border-white/50 peer placeholder-transparent'
                        />
                        <label
                            className='absolute top-0 left-0 pl-4 peer-placeholder-shown:top-4 peer-focus:top-[6px] transition-all -z-10 '
                        >Email</label>
                    </div>
                    <div className='relative '>
                        <input
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            type='password'
                            className='w-full p-4 bg-black/50 rounded-md border border-white/50 peer placeholder-transparent'
                        />
                        <label
                            className='absolute top-0 left-0 pl-4 peer-placeholder-shown:top-4 peer-focus:top-[6px] transition-all -z-10 '
                        >Password</label>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <button
                            onClick={handleRegister}
                            disabled={isLoading}
                            className='bg-red-500 py-3 w-full text-white font-bold rounded-md disabled:bg-red-400 disabled:cursor-wait'>
                            Sign Up
                        </button>
                        <p>Already have an account?
                            <span
                                onClick={() => navigate("/login")}
                                className='text-blue-500 underline cursor-pointer ml-2'
                            >
                                Sign In Here
                            </span>
                        </p>
                    </div>

                </form>
            </div>
        </DefaultLayout>
    )
}

export default Register