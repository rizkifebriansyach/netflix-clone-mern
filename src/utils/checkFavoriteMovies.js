import { apiInstanceExpress } from "./apiInstance"

export const checkFavoriteMovies = async ({ emailStorage, tokenStorage, idMovie }) => {
    try {
        const isfavorited = await apiInstanceExpress.post('my-movies/check', {
            email: emailStorage,
            token: tokenStorage,
            movieId: idMovie
        })

        console.log(isfavorited)
        if (isfavorited.status === 200) return isfavorited.data.data.isFavorited
    } catch (error) {
        console.log(error)
    }
}