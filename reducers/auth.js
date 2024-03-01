import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { FIREBASE_AUTH } from "../helpers/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"

export const signInUser = createAsyncThunk(
    'sign-in-user', //make the redux can detect, must unique
    async (payload, thunkApi) => {
        const firebaseAuth = FIREBASE_AUTH
        return signInWithEmailAndPassword(firebaseAuth, payload.email, payload.password)
    }
)

const authSlice = createSlice({
    name: 'auth', //must unique
    initialState: {
        user: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            signInUser.fulfilled, 
            (state, action) => {
                console.log(action)
                // state.user = action.payload
            }
        )
    }
})

const authReducer = authSlice.reducer
export default authReducer