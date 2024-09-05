import { apiInstance } from "./apiInstance";

export const getVideoUrl = async ({ movie_id }) => {
    const url = apiInstance.get(`${import.meta.env.VITE_BASE_URL_TMDB}movie/${movie_id}/videos`)
    return (await url).data.results[0].key
}