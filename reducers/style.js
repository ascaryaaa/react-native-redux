import { createSlice } from "@reduxjs/toolkit";
import { StyleSheet } from "react-native"

const styleSlice = createSlice ({
    name: 'global-style',
    initialState: {
        globalStyle: StyleSheet.create({
          container: {
            flex: 1,
            flexWrap: 'wrap',
          }
        })
    },
    reducers: {}
})

const styleReducer = styleSlice.reducer

export default styleReducer