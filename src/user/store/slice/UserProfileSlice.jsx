import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "../thunk/UserProfileThunk"; 

const UserProfileSlice = createSlice({
    name: "user",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(fetchUser.pending, (state) => {
                console.log("fetchUser pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.rejected, (state) => {
                console.log("fetchUser rejected");
                state.loading = false;
                state.error = null;
                
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                console.log("fetchUser fulfilled");
                state.loading = false;
                state.error = null;
                state.data = action.payload.data
            })
    }
})

export const userReducer = UserProfileSlice.reducer;