import React from 'react';
import { StyleSheet, View } from 'react-native';

const Spacer = () => {
    return <View style={styles.spacer} />
}

const styles = StyleSheet.create({
    spacer: {
        margin: 15,
        marginBottom: 25
    }
});

export default Spacer;