import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchAnime} from "./AsyncActions";
import {AnimeSliceEnum, AnimeStateType} from "./types";

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
        // offsetCount(state, action: PayloadAction<number>) {
        //     state.offset = state.data.find(item => Number(item.id) > 8) ? action.payload : ''
        // },
        addFavourite(state, action: PayloadAction<string>) {
            state.favourite = [...state.favourite, action.payload]
        },
        removeFavourite(state, action: PayloadAction<string>) {
            state.favourite = state.favourite.join(',').split(',').filter(id => id !== action.payload)
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchAnime.pending, (state: AnimeStateType) => {
            state.status = AnimeSliceEnum.LOADING
            state.data = []
        })
        builder.addCase(fetchAnime.fulfilled, (state: AnimeStateType, action: PayloadAction<any[]>) => {
            state.status = AnimeSliceEnum.SUCCESS
            state.data = [...state.data, ...action.payload]
        })
        builder.addCase(fetchAnime.rejected, (state: AnimeStateType) => {
            state.status = AnimeSliceEnum.ERROR
        })
    }
})

const {actions, reducer} = animeSlice
export const {addFavourite, removeFavourite} = actions

export default reducer