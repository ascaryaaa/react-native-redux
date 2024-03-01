import { createAsyncThunk, createSlice, isRejected } from "@reduxjs/toolkit"
import { FIREBASE_AUTH } from "../helpers/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { Alert} from "react-native"

export const signInUser = createAsyncThunk(
    'sign-in-user', //make the redux can detect, must unique
    async (payload, thunkApi) => {
        console.log(payload)
        const firebaseAuth = FIREBASE_AUTH
        try {
            const response = await signInWithEmailAndPassword(firebaseAuth, payload.email, payload.password)
            const token = await response.user.getIdToken()
            return thunkApi.fulfillWithValue(token)
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)


const authSlice = createSlice({
    name: 'auth', //must unique
    initialState: {
        token: null,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            signInUser.fulfilled, 
            (state, action) => {
                // console.log(action.payload)
                state.token = action.payload
                state.loading = false
            }
        )
        builder.addCase(
            signInUser.rejected,
            (state, action) => {
                state.loading = false
                Alert.alert(action.payload)
            }
        )
        builder.addCase(
            signInUser.pending,
            (state, action) => {
                state.loading = true
            }
        )
    }
})

const authReducer = authSlice.reducer
export default authReducer