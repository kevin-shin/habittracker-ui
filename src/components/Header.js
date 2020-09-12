import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = (props) => {
    return (
        <View style={styles.header}>
            <Text style={styles.textSize}>{props.titleName}</Text>
        </View>
    )
};


const styles = StyleSheet.create({
    header: {
        justifyContent: "flex-end",
        alignItems: "center",
        height: 80,
    },
    textSize: {
        fontSize: 22
    }
})
export default Header;