import React from 'react'
import Navbar from '../../../pages/Landing/Navbar'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../utils/firebase'
import Loading from '../../Modules/Elements/Loading'
import { useAtom } from 'jotai'
import { emailStorageAtom, tokenAtom } from '../../../jotai/atoms'

const DefaultLayout = ({ children }) => {
    const [user, loading, error] = useAuthState(auth)
    const [email] = useAtom(emailStorageAtom)
    const [token] = useAtom(tokenAtom)

    if (loading) return <Loading />

    if (error) return <p>Error...</p>

    if (user && email && token) return location.replace("/browse")

    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}

export default DefaultLayout