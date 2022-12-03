import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchUser} from "./AsyncActions";

export type UserType = {
    _id: string
    email: string
    fullName: string
    createdAt: string
    token?: string | undefined
}

type UserStateType = {
    user: UserType | null
    status: string
}

const initialState: UserStateType = {
    user: null,
    status: 'loading'
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchUser.pending, (state: UserStateType) => {
            state.status = 'loading'
        })
        builder.addCase(fetchUser.fulfilled, (state: UserStateType, action: PayloadAction<any>) => {
            state.status = 'fulfilled'
            state.user = action.payload
        })
        builder.addCase(fetchUser.rejected, (state: UserStateType) => {
            state.status = 'rejected'
        })
    }
})

const {actions, reducer} = userSlice
// export const {} = actions

export default reducer