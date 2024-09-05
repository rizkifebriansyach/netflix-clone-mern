import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BrowseLayout from '../../components/layout/BrowseLayout'
import ReactPlayer from 'react-player'
import { GoArrowLeft } from 'react-icons/go'

const Watch = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    return (
        <BrowseLayout>
            <button
                onClick={() => navigate("/browse")}
                className='absolute top-20 left-5 hover:text-white cursor-pointer'
            >
                <GoArrowLeft size={44} />
            </button>
            <ReactPlayer
                url={"https://youtube.com/watch?v=" + id}
                height={"100vh"}
                width={"100%"}
                playing={true}
                muted={false}
                controls={false}
            />
        </BrowseLayout>
    )
}

export default Watch