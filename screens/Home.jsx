import AsyncStorage from "@react-native-async-storage/async-storage"
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator } from "react-native"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import counter from "../reducers/counter"
import { counterActions } from "../reducers/counter"
import { getTopAnime } from "../reducers/anime"

const Home = ({navigation}) => {    
    const handleLogout = () => {
        AsyncStorage
        .removeItem('token')
        .then(() => navigation.navigate('Login'))
    }
    // const count = useSelector((state) => state.counter.count)
    const globalStyle = useSelector((state) => state.style.globalStyle)
    const animeState = useSelector((state) => state.anime)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTopAnime())
    }, [dispatch])

    return (
        <View style={globalStyle.container}>
            <ScrollView>
                <TouchableOpacity title='login' style={styles.button} onPress={handleLogout}>
                        <Text style={{color:'white'}} >logout</Text>
                </TouchableOpacity>
                <View style={styles.row}>
                {
                    animeState.loading 
                    ? <ActivityIndicator/>
                    : animeState?.data?.map(anime => (
                        <TouchableOpacity style={styles.imagecontainer} onPress={() => navigation.navigate('Detail', {
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
                </View>
                {/* <Text>{count}</Text> */}
                {/* <TouchableOpacity title='login' style={styles.button} onPress={() => dispatch(counterActions.increment())}>
                        <Text style={{color:'white'}} >increment</Text>
                </TouchableOpacity>
                <TouchableOpacity title='login' style={styles.button} onPress={() => dispatch(counterActions.decrement())}>
                        <Text style={{color:'white'}} >decrement</Text>
                </TouchableOpacity>
                <TouchableOpacity title='login' style={styles.button} onPress={() => navigation.navigate('Counter')}>
                        <Text style={{color:'white'}} >counter</Text>
                </TouchableOpacity> */}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#222222',
        padding: 5,
        paddingHorizontal: 15,
        borderRadius: 5,
        width: 120,
        alignItems: 'center',
        marginVertical: 25,
        marginHorizontal: 10,
        alignSelf: 'flex-end'
    },
    image: {
        width: 115,
        height: 160,
        alignSelf:'flex-Start',
    },
    listContainer: {
        width:'100%',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    },  
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems:'center'
    },
    imagecontainer: {
        padding: 5,
    }
});

export default Home;