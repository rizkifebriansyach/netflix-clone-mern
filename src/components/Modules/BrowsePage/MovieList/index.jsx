import React, { useEffect, useState } from 'react'
import EachUtils from '../../../../utils/EachUtils'
import { LIST_VIDEOS } from '../../../../constants/dummyVideo'
import MovieCard from '../MovieCard'
import CarouselLayout from '../../../layout/CarouselLayout'
import { idMovieAtom, isFetchingAtom } from '../../../../jotai/atoms'
import { useAtom } from 'jotai'
import { getMoviesByType } from '../../../../utils/getMoviesByType'

const MovieList = ({ title, moviesType }) => {
    const [isHover, setIsHover] = useState(false)
    const [, setIdMovie] = useAtom(idMovieAtom)
    const [movieList, setMovieList] = useState([])
    const [, setIsFetching] = useAtom(isFetchingAtom)

    useEffect(() => {
        if (moviesType) {
            getMoviesByType({ moviesType }).then((result) => {
                setIsFetching(true)
                setMovieList(result)
            }).finally(() => {
                setTimeout(() => {
                    setIsFetching(false)
                }, 500);
            })
        }
    }, [moviesType])

    return (
        <section className='px-8 py-4'>
            <h3 className='text-white text-3xl font-semibold mb-2'>{title}</h3>
            <CarouselLayout >
                <EachUtils
                    of={movieList}
                    render={(item, index) => (
                        <div
                            className='carousel-item w-1/4 lg:w-1/6 '
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
                                moviesType={moviesType}
                            />
                        </div>
                    )}
                />
            </CarouselLayout>
        </section>
    )
}

export default MovieList