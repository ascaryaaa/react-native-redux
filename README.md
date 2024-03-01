# Firebase Setup:
1. Add project: Create a new project in the Firebase console.
2. Add web app and register app: After creating the project, add a web app to it. Register your app by providing the necessary details such as the app's nickname and optional configurations.
3. Add new provider: Native provider Email/Password: In the Firebase console, navigate to the Authentication section and enable the Email/Password provider. This allows users to sign in using their email and password credentials.

![image](https://github.com/ascaryaaa/react-native-authentication-authorization/assets/73589875/08c5067a-a07c-474b-a00f-050b2a8bc203)

# Login and Register
For handling user authentication, you can utilize Firebase Authentication in your React Native application. Below are the steps to implement login and register functionalities:
1. Initialize Authentication
- Begin by preparing your app to handle user authentication using Firebase.
- Create placeholders (auth, email, and password) to manage user authentication and input fields.
```
    const auth=FIREBASE_AUTH
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
```
2. Input Fields
- Add fields where users can type their email and password.
- For the email field, users type their email, updating the stored email value.
- For the password field, users type their password securely, updating the stored password value.
```
            <TextInput 
                style={styles.input} 
                placeholder="email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput style={styles.input} 
                placeholder="password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}    
            />
```

## Register
1. Create handleRegister
- Define a function named handleRegister to manage user registration.
- Inside this function:
    - Use useState to initialize state variables for email and password.
    - Call createUserWithEmailAndPassword method from Firebase Authentication (auth) to register the user with the provided email and password.
    - Log the response to the console if registration is successful.
    - If there's an error during registration, catch it and display an error message using Alert.alert.
```
    const auth=FIREBASE_AUTH
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleRegister = async() => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            console.log(response)
        } catch(error) {
            console.log(error)
            Alert.alert('Error on Register', error.message)
        }
    }
```

2. log response example:
After registering a user successfully, an example of the response is logged to the console.
```
 LOG  {"_tokenResponse": {"displayName": "", "email": "jhon@gmail.com", "expiresIn": "3600", "idToken": "eyJhbG
```


3. Registered on firebase
The screenshot shows that the user has been successfully registered on Firebase.
![image](https://github.com/ascaryaaa/react-native-authentication-authorization/assets/73589875/386e16de-3c11-46cf-b71e-baadd8dd9212)

## Login
1. Install Async Storage
```
npm i @react-native-async-storage/async-storage
```
2. Create handle Login function:
- Define a function named handleLogin to manage the login process.
- Inside this function:
    - Use signInWithEmailAndPassword method from Firebase Authentication (auth) to sign in the user with the provided email and password.
    - Upon successful sign-in, obtain the user's authentication token using getIdToken() method.
    - Store the obtained token securely using Async Storage.
    - Display a success message using Alert.alert.
```
    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password) //1. sign in user
        .then(response => response.user.getIdToken()) //2. call user id token
        .then(token => AsyncStorage.setItem('token', token) ) //3. store token
        .then(() => {
            Alert.alert('Login Success!', 'Welcome!')
        }) 
    }
```
3. Create new screen and add it to navigation stack
```
import Home from './screens/Home';
///
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{
            title:'Home',
            headerShown: false,
            headerTitleAlign: 'center'
          }}
        />
```
4. Navigate login to the new screen
After successful login, display an alert message welcoming the user.
Navigate the user to the Home screen upon pressing the button using navigation.navigate('Home').
```
            Alert.alert('Login Success!', 'Welcome!', [
                {
                    text: 'Ok',
                    onPress: () => navigation.navigate('Home')
                }
            ])
```
```
const Login = ({navigation}) => {

}
```
Final loginHandle Code:
```
    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password) //1. sign in user
        .then(response => response.user.getIdToken()) //2. call user id token
        .then(token => AsyncStorage.setItem('token', token) ) //3. store token
        .then(() => {
            Alert.alert('Login Success!', 'Welcome!', [
                {
                    text: 'Ok',
                    onPress: () => navigation.navigate('Home')
                }
            ])
        }) 
    }
```
# Logout
1. Check if User is Logged In
- When the app starts, it checks if the user is already logged in by looking for a token in AsyncStorage.
- If a token is found, it means the user is logged in, and they are redirected to the home screen.
```
    useEffect(() => {
        AsyncStorage
        .getItem('token')
        .then(token => {
            if (token !== null) {
                navigation.navigate('Home')
            }
        })
    }, [])
```
2. Display Logout Button
```
            <TouchableOpacity title='login' style={styles.button} onPress={handleLogout}>
                <Text style={{color:'white'}} >Logout</Text>
            </TouchableOpacity>
```
3. Handle Logout Action
- When the user taps the "Logout" button, the app removes the stored token, effectively logging out the user.
- After logout, the app navigates the user back to the login screen.
```
    const handleLogout = () => {
        AsyncStorage
        .removeItem('token')
        .then(() => navigation.navigate('Login'))
    }
```
