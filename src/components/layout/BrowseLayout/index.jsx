import React from 'react'
import Navbar from '../../../pages/Browse/Navbar'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../utils/firebase'
import Loading from '../../Modules/Elements/Loading'
import { emailStorageAtom, tokenAtom } from '../../../jotai/atoms'
import { useAtom } from 'jotai'

const BrowseLayout = ({ children }) => {
    const [user, loading, error] = useAuthState(auth)
    const [email] = useAtom(emailStorageAtom)
    const [token] = useAtom(tokenAtom)


    if (loading) return <Loading />

    if (error) return <p>Error...</p>

    if (!user && !email && !token) return location.replace("/")

    return (
        <>
            <Navbar />
            <div>
                {children}
            </div>
        </>
    )
}

export default BrowseLayout