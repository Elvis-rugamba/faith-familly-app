import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const NewsScreen = () => {
    return (
        <View style={styles.container}>
      <Text>News</Text>
    </View>
    )
}

export default NewsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
})
