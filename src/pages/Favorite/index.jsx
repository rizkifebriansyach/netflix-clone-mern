import React, { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { emailStorageAtom, idMovieAtom, isFavoritedAtom, tokenAtom } from '../../jotai/atoms'
import { apiInstanceExpress } from '../../utils/apiInstance'
import BrowseLayout from '../../components/layout/BrowseLayout'
import EachUtils from '../../utils/EachUtils'
import Modal from '../../components/Modules/BrowsePage/Modal'
import MovieCard from '../../components/Modules/BrowsePage/MovieCard'

const Favorite = () => {
    const [isHover, setIsHover] = useState(false)
    const [, setIdMovie] = useAtom(idMovieAtom)
    const [emailStorage] = useAtom(emailStorageAtom)
    const [tokenStorage] = useAtom(tokenAtom)
    const [movieList, setMovieList] = useState([])
    const [isFavorited] = useAtom(isFavoritedAtom)

    const getFavoriteMovies = async () => {
        try {
            const url = `my-movies/${emailStorage}/${tokenStorage}`
            const movies = await apiInstanceExpress.get(url)
            if (movies.status === 200) return movies.data
        } catch (error) {
            console.log({ error })
            return error
        }

    }

    useEffect(() => {
        if (emailStorage && tokenStorage) {
            getFavoriteMovies().then(result => setMovieList(result.data.favoriteMovies))
        }

    }, [emailStorage, tokenStorage, isFavorited])

    return (
        <BrowseLayout>
            <div className='mt-20 px-8'>
                <h3>
                    Favorite Movies
                </h3>
                {movieList.length === 0 && <p>Belum ada film favorite saat ini...</p>}
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8  px-8 gap-4 mt-4'>
                <EachUtils
                    of={movieList}
                    render={(item, index) => (
                        <div
                            className=' h-72 '
                            onMouseLeave={() => {
                                setIsHover(false)
                                setIdMovie(null)
                            }}
                            key={index}
                        >
                            <MovieCard
                                data={item}
                                isHover={isHover}
                                setIsHover={setIsHover}
                            />
                        </div>
                    )}
                />
            </div>
            <Modal />
        </BrowseLayout>
    )
}

export default Favorite