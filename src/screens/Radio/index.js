import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const RadioScreen = () => {
    return (
        <View style={styles.container}>
      <Text>Radio</Text>
    </View>
    )
}

export default RadioScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
})
