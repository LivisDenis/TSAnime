import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import animeSlice from "./anime/slice";
import userSlice from "./user/slice";
import {animeApi} from "./anime/apiQuery";


const store = configureStore({
    reducer: {
        anime: animeSlice,
        user: userSlice,
        [animeApi.reducerPath]: animeApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(animeApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store