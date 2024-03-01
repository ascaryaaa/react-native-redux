import AsyncStorage from "@react-native-async-storage/async-storage"
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator } from "react-native"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import counter from "../reducers/counter"
import { counterActions } from "../reducers/counter"
import { getTopAnime } from "../reducers/anime"

const Home = ({navigation}) => {
    const [animes, setAnimes] = useState([])

    // useEffect(() => {
    //     AsyncStorage
    //     .getItem('token') //check token existed
    //     .then(token => {
    //         if (token !== null) { //if token existed
    //             return fetch('https://api.jikan.moe/v4/top/anime')
    //         }
    //         return Promise.reject('Not Authorize') //if token not existed
    //     })
    //     .then(response => response.json()) //convert response token
    //     .then(res => setAnimes(res.data))
    // },[])
    
    const handleLogout = () => {
        AsyncStorage
        .removeItem('token')
        .then(() => navigation.navigate('Login'))
    }
    const count = useSelector((state) => state.counter.count)
    const globalStyle = useSelector((state) => state.style.globalStyle)
    const animeState = useSelector((state) => state.anime)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTopAnime())
    }, [dispatch])

    return (
        <View style={globalStyle.container}>
            <ScrollView>
            {/* <ScrollView>
                <View style={styles.listContainer}>
                {animes?.map(anime => (
                    <Image
                        key={anime.mal_id}
                        source={{uri: anime.images.jpg.image_url}}
                        style={styles.image}  
                    />
                )
                )}
                <TouchableOpacity title='login' style={styles.button} onPress={handleLogout}>
                    <Text style={{color:'white'}} >Logout</Text>
                </TouchableOpacity>
                </View>
            </ScrollView> */}
            {
                animeState.loading 
                ? <ActivityIndicator/>
                : animeState?.data?.map(anime => (
                    <TouchableOpacity onPress={() => navigation.navigate('Detail', {
                        image: anime.images.jpg.image_url, 
                        title: anime.title,
                        synopsis: anime.synopsis}
                    )}>
                        <Image 
                            style={styles.image}
                            key={anime.mal_id}
                            source={{uri: anime.images.jpg.image_url}}
                        />
                    </TouchableOpacity>
                ))
            }


            <Text>{count}</Text>
            <TouchableOpacity title='login' style={styles.button} onPress={() => dispatch(counterActions.increment())}>
                    <Text style={{color:'white'}} >increment</Text>
            </TouchableOpacity>
            <TouchableOpacity title='login' style={styles.button} onPress={() => dispatch(counterActions.decrement())}>
                    <Text style={{color:'white'}} >decrement</Text>
            </TouchableOpacity>
            <TouchableOpacity title='login' style={styles.button} onPress={() => navigation.navigate('Detail')}>
                    <Text style={{color:'white'}} >go to detail</Text>
            </TouchableOpacity>
            <TouchableOpacity title='login' style={styles.button} onPress={handleLogout}>
                    <Text style={{color:'white'}} >logout</Text>
            </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#4287f5',
        padding: 5,
        paddingHorizontal: 15,
        borderRadius: 5,
        width: 120,
        alignItems: 'center',
        margin: 5,
    },
    image: {
        width: 100,
        height: 150,
    },
    listContainer: {
        width:'100%',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    }
});

export default Home;