import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const MusicPlayerScreen = () => {
    return (
        <View style={styles.container}>
      <Text>Music Player</Text>
    </View>
    )
}

export default MusicPlayerScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
})
