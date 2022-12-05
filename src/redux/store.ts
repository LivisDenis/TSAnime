import {configureStore} from "@reduxjs/toolkit";
import {animeApi} from "./anime/apiQuery";


const store = configureStore({
    reducer: {
        [animeApi.reducerPath]: animeApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(animeApi.middleware)
})

export default store