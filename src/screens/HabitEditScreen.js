import React, { useState } from 'react';
import { Text, TextInput, StyleSheet, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import Spacer from '../components/Spacer';
import habitApi from '../api/habitApi';


const updateHabit = async (habitEntry) => {
    const updatedHabit = {
        name: habitEntry.name,
        remindTime: new Date(habitEntry.remindTime).getTime(),
        repeat: habitEntry.repeat,
        id: habitEntry._id
    };

    try {
        const newHabit = await habitApi.put("/habit", updatedHabit);
    }
    catch (e) {
        console.log(e);
    }
}

const deleteHabit = async (id) => {
    try {
        await habitApi.delete("/habit", { id })
    }
    catch (e) {
        console.log(e);
    }
}

const HabitEditScreen = (props) => {
    const item = props.route.params.item;
    const navigation = props.route.params.navigation;

    const [habitEntry, setHabitEntry] = useState({
        ...item, remindTime: new Date(item.remindTime)
    });

    return (
        <>
            <Spacer> </Spacer>
            <TextInput
                style={styles.habitName}
                maxLength={30}
                value={habitEntry.name}
                onChangeText={text => setHabitEntry({ ...habitEntry, name: text })}
            />
            <View style={styles.checkBoxContainer}>
                <TouchableOpacity
                    onPress={() => setHabitEntry({ ...habitEntry, repeat: { ...habitEntry.repeat, sunday: !habitEntry.repeat.sunday } })}
                    style={[styles.weekday, habitEntry.repeat.sunday ? styles.checkedWeekday : styles.uncheckedWeekday]}
                >
                    <Text>Sun</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setHabitEntry({ ...habitEntry, repeat: { ...habitEntry.repeat, monday: !habitEntry.repeat.monday } })}
                    style={[styles.weekday, habitEntry.repeat.monday ? styles.checkedWeekday : styles.uncheckedWeekday]}
                >
                    <Text>Mon</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setHabitEntry({ ...habitEntry, repeat: { ...habitEntry.repeat, tuesday: !habitEntry.repeat.tuesday } })}
                    style={[styles.weekday, habitEntry.repeat.tuesday ? styles.checkedWeekday : styles.uncheckedWeekday]}
                >
                    <Text>Tue</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setHabitEntry({ ...habitEntry, repeat: { ...habitEntry.repeat, wednesday: !habitEntry.repeat.wednesday } })}
                    style={[styles.weekday, habitEntry.repeat.wednesday ? styles.checkedWeekday : styles.uncheckedWeekday]}
                >
                    <Text>Wed</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.checkBoxContainer}>
                <TouchableOpacity
                    onPress={() => setHabitEntry({ ...habitEntry, repeat: { ...habitEntry.repeat, thursday: !habitEntry.repeat.thursday } })}
                    style={[styles.weekday, habitEntry.repeat.thursday ? styles.checkedWeekday : styles.uncheckedWeekday]}
                >
                    <Text>Thurs</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setHabitEntry({ ...habitEntry, repeat: { ...habitEntry.repeat, friday: !habitEntry.repeat.friday } })}
                    style={[styles.weekday, habitEntry.repeat.friday ? styles.checkedWeekday : styles.uncheckedWeekday]}
                >
                    <Text>Fri</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setHabitEntry({ ...habitEntry, repeat: { ...habitEntry.repeat, saturday: !habitEntry.repeat.saturday } })}
                    style={[styles.weekday, habitEntry.repeat.saturday ? styles.checkedWeekday : styles.uncheckedWeekday]}
                >
                    <Text>Sat</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.remindTimeText}>Remind Time: </Text>
                <DateTimePicker
                    mode="time"
                    is24Hour={true}
                    display="default"
                    value={habitEntry.remindTime}
                    onChange={(event, selectedDate) => {
                        setHabitEntry({ ...habitEntry, remindTime: selectedDate });
                    }}
                />
            </View>
            <Spacer />
            <TouchableOpacity
                style={styles.saveButton}
                onPress={() => {
                    updateHabit(habitEntry);
                    navigation.navigate("Habits");
                }}
            >
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => deleteHabit(habitEntry._id)}
            >
                <Text style={styles.deleteButtonText}>Delete Habit</Text>
            </TouchableOpacity>

        </>
    )
}

const styles = StyleSheet.create({
    habitName: {
        height: 50,
        fontSize: 25,
        paddingLeft: 40,
        paddingRight: 20,
        marginBottom: 10
    },
    saveButton: {
        alignSelf: "center",
        backgroundColor: "#1261A0",
        borderRadius: 10
    },
    deleteButtonText: {
        alignSelf: "center",
        marginTop: 45,
        fontSize: 22,
        color: "#1261A0"
    },
    buttonText: {
        fontSize: 25,
        color: "white",
        padding: 15,
        paddingLeft: 25,
        paddingRight: 25
    },
    checkBoxContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 10
    },
    weekday: {
        alignSelf: "flex-start",
        padding: 15,
        marginLeft: 12,
        marginRight: 12
    },
    checkedWeekday: {
        backgroundColor: "gray"
    },
    uncheckedWeekday: {
        backgroundColor: "white"
    },
    remindTimeText: {
        fontSize: 20,
        marginLeft: 40,
        marginTop: 30
    }
})


export default withNavigation(HabitEditScreen);