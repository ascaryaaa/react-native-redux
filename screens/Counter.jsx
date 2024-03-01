import { View, StyleSheet, Text} from "react-native"
import { useSelector } from "react-redux"

const counter = () => {
    const count = useSelector((state) => state.counter.count)

    return (
        <View style={styles.container}>
            <Text>{count}</Text>
        </View>
    )
}

export default counter;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        //backgroundColor: 'red',
    }
})