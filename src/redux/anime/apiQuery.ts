import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {AnimeType, fetchParamsType} from "./types";
import {apiUrl} from "../../axios";

export const animeApi = createApi({
    reducerPath: 'animeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BACKEND_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token')
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    tagTypes: ['Favourite'],
    endpoints: (builder) => ({
        getAnime: builder.query<AnimeType[], fetchParamsType>({
            query: ({queryOffset, querySearch, rating}) =>
                `${apiUrl}?${rating}&page[limit]=8${queryOffset}${querySearch}`,
            transformResponse: (response: { data: AnimeType[] }) => response.data,
            providesTags: ['Favourite']
        }),
        getAnimeByUser: builder.query<AnimeType[], void>({
            query: () => `/favourite`,
            providesTags: ['Favourite']
        }),
        getOneAnime: builder.query<AnimeType, string>({
            query: (slug) => `${apiUrl}?filter[slug]=${slug}`,
            transformResponse: (response: { data: { 0: AnimeType } }) => response.data[0],
        }),
        removeFavourite: builder.mutation<string, string>({
            query: (id) => ({
                url: `/favourite/remove/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ['Favourite']
        }),
    }),
})

export const { useGetAnimeByUserQuery, useRemoveFavouriteMutation, useGetAnimeQuery, useGetOneAnimeQuery } = animeApi