# Run the application
1. Install Node
2. Install NPM
3. Install expo on phone
3. Run Expo on console
Go to the project directory and run:
```
npx expo start
```
4. Connect
Scan barcode or input the number in console to the phone 

# Redux
1. Install redux
- npm
```
npm i react-redux @reduxjs/toolkit
```
- yarn
```
yarn add @reduxjs/toolkit react-redux
```
2. Create directory
-reduceres
  - index.js
  - counter.js
3. index.js
Configures the Redux store using configureStore from Redux Toolkit. It combines all reducers, in this case, only the counter reducer.
```
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './counter'

export default configureStore({
    reducer: {
        counter: counterReducer
    }
})
```
4. Counter.js
Defines a Redux slice using createSlice from Redux Toolkit. This slice manages the state related to the counter, including its initial state and reducers for incrementing and decrementing the count.
```
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        count: 0,

    },
    reducers: {
        increment: (state) => {
            state.count += 1
        },
        decrement: (state) => {
            state.count -= 1
        }
    }
})

//export const { } = counterSlice.actions
export const counterActions = counterSlice.actions

export default counterSlice.reducer;
```
5. Inside page
Import necessary dependencies from React Redux and the counter reducer.
```
mport { useDispatch, useSelector } from "react-redux"
import counter from "../reducers/counter"
import { counterActions } from "../reducers/counter"
```

Use useSelector hook to extract the count from the Redux store state and useDispatch hook to dispatch actions.
```
    const count = useSelector((state) => state.counter.count)
    const dispatch = useDispatch()
```

Display the count value and provide buttons to increment and decrement the count, dispatching respective actions when clicked.
```
            <Text>{count}</Text>
            <TouchableOpacity title='login' style={styles.button} onPress={() => dispatch(counterActions.increment())}>
                    <Text style={{color:'white'}} >increment</Text>
            </TouchableOpacity>
            <TouchableOpacity title='login' style={styles.button} onPress={() => dispatch(counterActions.decrement())}>
                    <Text style={{color:'white'}} >decrement</Text>
            </TouchableOpacity>
```
6. Extending Redux State to Multiple Screens
By importing useSelector from "react-redux", you can access the count value from the counter slice of the Redux store. This allows you to display the count value on different screens of your application.
```
import { useSelector } from "react-redux"
```
Use the useSelector hook to extract the count value from the Redux store's state. This hook takes a selector function as an argument, which returns the desired part of the state. In this case, it retrieves the count value from the counter slice of the Redux store.
```
const count = useSelector((state) => state.counter.count)
```
You can then use the Text component from React Native to display the count value on your screen.
```
<Text>{count}</Text>
```
