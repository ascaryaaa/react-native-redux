import { View, StyleSheet, Text, Image, ActivityIndicator } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { getTopAnime } from "../reducers/anime"
import { useState, useEffect } from "react"

const detail = ({route}) => {
    const title = route.params.title
    const synopsis = route.params.synopsis
    const image = route.params.image
    const count = useSelector((state) => state.counter.count)
    const dispatch = useDispatch()
    const animeState = useSelector((state) => state.anime)

    useEffect(() => {
        dispatch(getTopAnime())
    }, [dispatch])

    return (
        <View style={styles.container}>
            <View style={styles.imagetitle}>
                {/* <Text>{count}</Text> */}
                <View>
                    <Image style={styles.image} source={{uri: image}}/>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{title}</Text>
                </View>
            </View>
            <View>
                <Text style={styles.synopsis}>{synopsis}</Text>
            </View>
        </View>
    )
}

export default detail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 300,
        padding: 10,
    },
    imagetitle: {
        flexDirection: 'row',
        padding: 30,
    },
    synopsis: {
        paddingHorizontal: 20,
        textAlign: 'justify',
    },
    text: {
        fontWeight:'bold',
        fontSize: 28,
    },
    textContainer: {
        padding: 20,
    }
})