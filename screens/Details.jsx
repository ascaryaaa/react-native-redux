import { View, StyleSheet, Text } from "react-native"
import { useDispatch, useSelector } from "react-redux"


const detail = () => {
    const count = useSelector((state) => state.counter.count)
    return (
        <View style={styles.container}>
            <Text>{count}</Text>
        </View>
    )
}

export default detail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})