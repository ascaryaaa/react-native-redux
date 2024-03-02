import { View, StyleSheet, Text, Image, ActivityIndicator, ScrollView } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { getAnimeDetail } from "../reducers/anime"
import { useState, useEffect } from "react"

const detail = ({route}) => {
    const id = route.params.id
    const title = route.params.title
    const synopsis = route.params.synopsis
    const image = route.params.image
    // const count = useSelector((state) => state.counter.count)
    const dispatch = useDispatch()
    const animeState = useSelector((state) => state.anime)

    useEffect(() => {
        dispatch(getAnimeDetail(id));
    }, [dispatch])

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.imagetitle}>
                    {/* <Text>{count}</Text> */}
                    <View style={styles.imagecontainer}>
                        <Image style={styles.image} source={{uri: image}}/>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{title}</Text>
                        <Text style={styles.text}>t{animeState?.title}t</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.synopsis}>{synopsis}</Text>
                    <Text style={styles.synopsis}>s{animeState?.synopsis}s</Text>
                </View>
            </ScrollView>
        </View>
    )
}

export default detail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        //backgroundColor: 'red',
    },
    image: {
        width: 200,
        height: 300,
        padding: 10,
    },
    imagetitle: {
        width: '100%',
        flexDirection: 'row',
        paddingVertical: 20,
        //backgroundColor: 'pink',
    },
    synopsis: {
        textAlign: 'justify',
    },
    text: {
        fontWeight:'bold',
        fontSize: 20,
    },
    textContainer: {
        padding: 10,
        alignItems: 'flex-start',
        //backgroundColor:'green',
        flex: 2,
    },
    imagecontainer: {
        alignItems: 'flex-start'
    }
})