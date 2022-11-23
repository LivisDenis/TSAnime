import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async () => {

        const response = await axios.get(`/auth/me`)

        return response.data
    }
)