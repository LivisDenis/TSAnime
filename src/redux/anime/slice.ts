import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchAnime} from "./AsyncActions";
import {AnimeSliceEnum, AnimeStateType} from "./types";

const initialState: AnimeStateType = {
    data: [],
    status: AnimeSliceEnum.LOADING
}

export const animeSlice = createSlice({
    name: 'anime',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchAnime.pending, (state: AnimeStateType) => {
            state.status = AnimeSliceEnum.LOADING
        })
        builder.addCase(fetchAnime.fulfilled, (state: AnimeStateType, action: PayloadAction<any[]>) => {
            state.status = AnimeSliceEnum.SUCCESS
            state.data = action.payload
        })
        builder.addCase(fetchAnime.rejected, (state: AnimeStateType) => {
            state.status = AnimeSliceEnum.ERROR
        })
    }
})

const {actions, reducer} = animeSlice
// export const {} = actions

export default reducer