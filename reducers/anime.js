import { createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import { FIREBASE_AUTH } from "../helpers/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { Alert} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"

export const getTopAnime = createAsyncThunk(
    'get-top-anime',
    async (payload, thunkApi) => {
        try {
            const response = await axios.get('https://api.jikan.moe/v4/top/anime')
            // console.log("thunk", response.data.data.length)
            return thunkApi.fulfillWithValue(response.data.data)
        } catch (error) {

        }
    }
)

const animeSlice = createSlice({
    name: 'anime',
    initialState: {
        data: [],
        loading: false,
    },
    reducer: {},
    extraReducers: (builder) => {
        builder.addCase(getTopAnime.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getTopAnime.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = false
        })
    }

})

const animeReducer = animeSlice.reducer

// export const animeActions = animeSlice.actions

export default animeReducer