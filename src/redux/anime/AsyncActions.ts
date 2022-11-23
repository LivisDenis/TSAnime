import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {fetchParamsType} from "./types";
import {apiUrl} from "../../axios";

export const fetchAnime = createAsyncThunk(
    'anime/fetchAnime',
    async (params: fetchParamsType) => {
        const {queryOffset, querySearch, rating} = params

        const response = await axios.get(`${apiUrl}?${rating}&page[limit]=8${queryOffset}${querySearch}`)

        return response.data.data
    }

)