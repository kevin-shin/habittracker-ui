import React, { useState } from 'react';
import { Text, TextInput, StyleSheet, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import Spacer from '../components/Spacer';
import habitApi from '../api/habitApi';


const updateHabit = async (name, remindTime, repeat, id) => {
    const updatedHabit = { name, remindTime, repeat, id };

    try {
        const newHabit = await habitApi.put("/habit", updatedHabit);
    }
    catch (e) {
        console.log(e);
    }
}

const deleteHabit = async () => {
    console.log("hit here");
}

const HabitEditScreen = (props) => {
    const [habitName, setHabitName] = useState(props.route.params.item.name);
    const [repeat, setRepeat] = useState(props.route.params.item.repeat);
    const [remindTime, setRemindTime] = useState(props.route.params.item.remindTime);

    return (
        <>
            <Spacer> </Spacer>
            <TextInput
                style={styles.habitName}
                maxLength={20}
                value={habitName}
                onChangeText={text => setHabitName(text)}
            />
            <View style={styles.checkBoxContainer}>
                <TouchableOpacity
                    onPress={() => setRepeat({ ...repeat, sunday: !repeat.sunday })}
                    style={[styles.weekday, repeat.sunday ? styles.checkedWeekday : styles.uncheckedWeekday]}
                >
                    <Text>Sun</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setRepeat({ ...repeat, monday: !repeat.monday })}
                    style={[styles.weekday, repeat.monday ? styles.checkedWeekday : styles.uncheckedWeekday]}
                >
                    <Text>Mon</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setRepeat({ ...repeat, tuesday: !repeat.tuesday })}
                    style={[styles.weekday, repeat.tuesday ? styles.checkedWeekday : styles.uncheckedWeekday]}
                >
                    <Text>Tue</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setRepeat({ ...repeat, wednesday: !repeat.wednesday })}
                    style={[styles.weekday, repeat.wednesday ? styles.checkedWeekday : styles.uncheckedWeekday]}
                >
                    <Text>Wed</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.checkBoxContainer}>
                <TouchableOpacity
                    onPress={() => setRepeat({ ...repeat, thursday: !repeat.thursday })}
                    style={[styles.weekday, repeat.thursday ? styles.checkedWeekday : styles.uncheckedWeekday]}
                >
                    <Text>Thurs</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setRepeat({ ...repeat, friday: !repeat.friday })}
                    style={[styles.weekday, repeat.friday ? styles.checkedWeekday : styles.uncheckedWeekday]}
                >
                    <Text>Fri</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setRepeat({ ...repeat, saturday: !repeat.saturday })}
                    style={[styles.weekday, repeat.saturday ? styles.checkedWeekday : styles.uncheckedWeekday]}
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
                    value={remindTime}
                    onChange={newDate => setRemindTime(newDate)}
                />
            </View>
            <Spacer />
            <TouchableOpacity
                style={styles.saveButton}
                onPress={() => { updateHabit(this.habitName, this.remindTime, this.repeat, this.id) }}
            >
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => deleteHabit}
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