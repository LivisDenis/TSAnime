import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AnimeSliceEnum, AnimeStateType, AnimeType} from "./types";

const initialState: AnimeStateType = {
    data: [],
    favourite: [],
    offset: 0,
    status: AnimeSliceEnum.LOADING
}

export const animeSlice = createSlice({
    name: 'anime',
    initialState,
    reducers: {
        addFavourite(state, action: PayloadAction<AnimeType>) {
            state.favourite = [...state.favourite, action.payload]
        },
        removeFavourite(state, action: PayloadAction<string>) {
            state.favourite = state.favourite.filter(item => item._id !== action.payload)
        },
    }
})

const {actions, reducer} = animeSlice
export const {addFavourite, removeFavourite} = actions

export default reducer