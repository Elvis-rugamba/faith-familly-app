import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const TvPlayerScreen = () => {
    return (
        <View style={styles.container}>
      <Text>TV Show Player</Text>
    </View>
    )
}

export default TvPlayerScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
})
