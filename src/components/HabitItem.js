import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CheckBox from 'react-native-check-box';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { noAuto } from '@fortawesome/fontawesome-svg-core';

const HabitItem = ({ navigation, item, toggleCompleteStatus }) => {

    return (
        <View style={styles.container}>
            <CheckBox
                isChecked={item.done}
                onClick={() => {
                    toggleCompleteStatus(item._id);
                }
                }
                style={styles.checkBox}
            />
            <Text style={styles.textStyle}>{item.name}</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate("Edit Habit", { item, navigation })}
                style={styles.editButton}
            >
                <FontAwesomeIcon icon={faEdit} />
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    checkBox: {
        flex: 1,
        paddingLeft: 30
    },
    container: {
        display: "flex",
        marginBottom: 8,
        flexDirection: "row"
    },
    textStyle: {
        fontSize: 25,
        marginLeft: 50,
        flex: 15
    },
    editButton: {
        marginLeft: "auto",
        flex: 1,
        justifyContent: "center",
        marginRight: 30
    }
})

export default withNavigation(HabitItem);