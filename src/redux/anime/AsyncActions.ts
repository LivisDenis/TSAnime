import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAnime = createAsyncThunk(
    'anime/fetchAnime',
    async () => {
        const response = await axios.get(`https://kitsu.io/api/edge/anime`)

        return response.data.data
    }

)