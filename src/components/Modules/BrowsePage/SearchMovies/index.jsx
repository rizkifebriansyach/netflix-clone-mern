import React, { useEffect, useState } from 'react'
import { idMovieAtom, isFetchingAtom, searchMoviesAtom } from '../../../../jotai/atoms'
import { useAtom } from 'jotai'
import EachUtils from '../../../../utils/EachUtils'
import { searchMovies } from '../../../../utils/searchMovies'
import MovieCard from '../MovieCard'

const SearchMovies = () => {
    const [isHover, setIsHover] = useState(false)
    const [, setIdMovie] = useAtom(idMovieAtom)
    const [movieList, setMovieList] = useState([])
    const [searchQuery] = useAtom(searchMoviesAtom)
    const [, setIsFetching] = useAtom(isFetchingAtom)
    useEffect(() => {
        if (searchQuery) {
            searchMovies({ query: searchQuery }).then((result) => {
                setIsFetching(true)
                setMovieList(result)
            }).finally(() => {
                setTimeout(() => {
                    setIsFetching(false)
                }, 500)
            })
        }
    }, [searchQuery])

    return (
        <div className='grid grid-cols-4 p-8 m-10 gap-4'>
            <EachUtils
                of={movieList}
                render={(item, index) => (
                    <div
                        key={index}
                        className='h-72 mt-4'
                        onMouseLeave={() => {
                            setIsHover(false)
                            setIdMovie(null)
                        }}

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
    )
}

export default SearchMovies