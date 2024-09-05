import React, { useEffect, useState } from 'react'
import EachUtils from '../../../../utils/EachUtils'
import { GoPlay } from 'react-icons/go'
import { useAtom } from 'jotai'
import { idMovieAtom, isOpenModalAtom } from '../../../../jotai/atoms'
import { getMoviesRecommendation } from '../../../../utils/getMoviesRecommendation'
import { getVideoUrl } from '../../../../utils/getVideoUrl'
import { useNavigate } from 'react-router-dom'

const Recommendation = () => {
    const navigate = useNavigate()
    const [idMovie, setIdMovie] = useAtom(idMovieAtom)
    const [moviesRecommendation, setMoviesRecommendation] = useState([])
    const [, setIsOpenModal] = useAtom(isOpenModalAtom)
    const [videoUrl, setVideoUrl] = useState(null)

    useEffect(() => {
        if (idMovie) {
            getMoviesRecommendation({ movie_id: idMovie }).then(result => setMoviesRecommendation(result))
        }
    }, [idMovie])

    return (
        <div className='px-4 py-2 text-white mt-4'>
            <h2>Movies Recommendation</h2>
            <div className='grid grid-cols-3 gap-2 mt-4'>
                <EachUtils
                    of={moviesRecommendation}
                    render={(item, index) => (
                        <div key={index}
                            className='w-full h-auto cursor-pointer'
                            onMouseEnter={() => {
                                getVideoUrl({ movie_id: item.id }).then(result => setVideoUrl(result))
                            }}
                        >
                            <div className='relative'>
                                <img src={import.meta.env.VITE_BASE_URL_TMDB_IMAGE + item.poster_path} className='w-full h-48 rounded-t-md' />
                                <button
                                    onClick={() => {
                                        navigate("/watch/" + videoUrl)
                                        setIsOpenModal(false)
                                        setIdMovie(null)

                                    }}
                                    className='absolute top-10 left-1/2 -translate-x-1/2'>
                                    <GoPlay size={44} />
                                </button>
                            </div>
                            <div className='p-2'>
                                <div className='flex gap-2'>
                                    <p>{item.release_date}</p>
                                    <p>{item.runtime}</p>
                                </div>
                                <p className='text-wrap pt-2 max-h-32 overflow-y-scroll'>{item.overview}</p>
                            </div>
                        </div>
                    )}
                />
            </div>
        </div>
    )
}

export default Recommendation