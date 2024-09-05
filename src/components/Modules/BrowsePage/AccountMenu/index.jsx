import { useAtom } from 'jotai'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { emailStorageAtom, tokenAtom } from '../../../../jotai/atoms'
import { signOut } from 'firebase/auth'
import { auth } from '../../../../utils/firebase'
import { apiInstanceExpress } from '../../../../utils/apiInstance'

const AccountMenu = () => {
    const navigate = useNavigate()
    const [token, setToken] = useAtom(tokenAtom)
    const [email, setEmailStorage] = useAtom(emailStorageAtom)

    const handleSginOut = async () => {
        const data = { email, token }
        const dbSginOut = await apiInstanceExpress.delete('my-token', { data })

        if (dbSginOut.status === 204) {
            signOut(auth).then(() => {
                setToken(null)
                setEmailStorage(null)
                navigate("/")
            })
        }
    }

    return (
        <div className='flex dropdown dropdown-hover dropdown-end'>
            <div className="avatar" tabIndex={0}>
                <div className="w-10 rounded" >
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>

            </div>
            <div className='dropdown-content absolute top-10 z-30 bg-black text-stone-200 py-2 px-4 flex flex-col gap-4 border border-stone-300/80 rounded-xl'
            >
                <p>{email}</p>
                <button
                    onClick={handleSginOut}
                    tabIndex={0}
                    className='hover:text-white transition-all'
                >
                    Sign Out
                </button>
            </div>
        </div>
    )
}

export default AccountMenu