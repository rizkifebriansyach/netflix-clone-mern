import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import { GoPlay, GoPlusCircle, GoChevronDown, GoTrash } from 'react-icons/go'
import { motion } from 'framer-motion'
import { useAtom } from 'jotai'
import { emailStorageAtom, idMovieAtom, isFavoritedAtom, isFetchingAtom, isOpenModalAtom, tokenAtom } from '../../../../jotai/atoms'
import { getVideoUrl } from '../../../../utils/getVideoUrl'
import Skeleton from './Skeleton'
import { useNavigate } from 'react-router-dom'
import { apiInstanceExpress } from '../../../../utils/apiInstance'
import Notifications from '../../Elements/Notifications'
import { checkFavoriteMovies } from '../../../../utils/checkFavoriteMovies'

const MovieCard = ({ data, isHover, setIsHover, moviesType }) => {
    const navigate = useNavigate()

    const [idMovie, setIdMovie] = useAtom(idMovieAtom)
    const [isOpenModal, setIsOpenModal] = useAtom(isOpenModalAtom)
    const [isFetching] = useAtom(isFetchingAtom)
    const [tokenStorage] = useAtom(tokenAtom)
    const [emailStorage] = useAtom(emailStorageAtom)
    const [isFavorited, setIsfavorited] = useAtom(isFavoritedAtom)

    const [isSubmit, setIsSubmit] = useState(false)
    const [notifMessage, setNotifMessage] = useState(null)
    const [videoUrl, setVideoUrl] = useState(null)
    const [moviesTypeState, setMoviesTypeState] = useState(null)

    const handleAddFavoriteMovies = async () => {
        if (emailStorage && tokenStorage) {
            try {
                setIsSubmit(true)
                const addMovie = await apiInstanceExpress.post('my-movies', {
                    email: emailStorage,
                    token: tokenStorage,
                    data
                })

                if (!addMovie.status === 201) return setNotifMessage(`Film ${data.title} gagal ditambahkan`)

                setNotifMessage(`Film ${data.title} berhasil ditambahkan`)
                setIsfavorited(true)

                setTimeout(() => {
                    setIsSubmit(false)
                    setNotifMessage(null)
                }, 3000)
            } catch (error) {
                setNotifMessage(`Maaf, ${error.message}`)
                setTimeout(() => {
                    setIsSubmit(false)
                    setNotifMessage(null)
                }, 3000)
            }

        }
    }

    const handleRemoveFavoriteMovies = async () => {
        if (!emailStorage && !tokenStorage) return;
        try {
            setIsSubmit(true)
            const removeMovie = await apiInstanceExpress.delete('my-movies', {
                data: {
                    email: emailStorage,
                    token: tokenStorage,
                    movieId: data.id
                }
            })
            if (removeMovie.status !== 204) return setNotifMessage(`Film ${data.title} gagal dihapus!`)

            setNotifMessage(`Film ${data.title} berhasil dihapus`)
            setIsfavorited(false)

            setTimeout(() => {
                setIsSubmit(false)
                setNotifMessage(null)
            }, 3000)
        } catch (error) {
            setNotifMessage(`Maaf, ${error.message}`)
            setTimeout(() => {
                setIsSubmit(false)
                setNotifMessage(null)
            }, 3000)
        }
    }

    if (isFetching) return <Skeleton />

    return (
        <>
            {isSubmit && notifMessage && <Notifications message={notifMessage} />}
            {isHover && idMovie == data.id && moviesType == moviesTypeState ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className='relative shadow-md transition-all w-full'>
                    <div className='hover:scale-110 transition-all'>
                        <ReactPlayer
                            url={`https://youtube.com/watch?v=${videoUrl}`}
                            playing={true}
                            muted={true}
                            loop={true}
                            width={"100%"}
                            height={"180px"}
                        />
                    </div>
                    <div className='h-auto p-2 bg-[#141414] flex flex-col gap-1.5 rounded-b-xl'>
                        <section className='mt-1 flex  justify-between'>
                            <div className='flex gap-2'>
                                <button onClick={() => navigate("/watch/" + videoUrl)}>
                                    <GoPlay size={24} />
                                </button>
                                <button
                                    onClick={isFavorited === true ? handleRemoveFavoriteMovies : handleAddFavoriteMovies}
                                    className='hover:text-white transition-all'
                                >
                                    {isFavorited === true ? <GoTrash size={24} /> : <GoPlusCircle size={24} />}
                                </button>
                            </div>
                            <div >
                                <button
                                    onClick={() => setIsOpenModal(true)}
                                    className='border rounded-full p-1'
                                >
                                    <GoChevronDown />
                                </button>
                            </div>
                        </section>
                        <section className='text-left   '>
                            <h3 className='font-semibold'>{data.title}</h3>
                            <p className='text-green-400'>Popularity: {data.popularity}</p>
                        </section>
                    </div>
                </motion.div>
            ) : <img
                onMouseEnter={() => {
                    setIsHover(true)
                    setIdMovie(data.id)
                    getVideoUrl({ movie_id: data.id }).then(resut => setVideoUrl(resut))
                    checkFavoriteMovies({ emailStorage: emailStorage, tokenStorage: tokenStorage, idMovie: data.id }).then(result => setIsfavorited(result))
                    setMoviesTypeState(moviesType)
                }}
                src={`${import.meta.env.VITE_BASE_URL_TMDB_IMAGE}${data.poster_path}`}
                className='w-full max-h-72 object-cover cursor-pointer rounded-xl'
            />
            }

        </>
    )
}

export default MovieCard