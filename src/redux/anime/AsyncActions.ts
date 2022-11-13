import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {fetchParamsType} from "./types";

export const fetchAnime = createAsyncThunk(
    'anime/fetchAnime',
    async (params: fetchParamsType) => {
        const {queryOffset, querySearch, rating} = params

        const response = await axios.get(`https://kitsu.io/api/edge/anime?${rating}&page[limit]=8${queryOffset}${querySearch}`)

        return response.data.data
    }

)