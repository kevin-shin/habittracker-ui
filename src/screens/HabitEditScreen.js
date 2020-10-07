import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import Spacer from '../components/Spacer';
import habitApi from '../api/habitApi';
import styles from '../../styles/HabitEditScreenStyles';
import { updateHabit, deleteHabit } from '../repository/habitsRepository';

const HabitEditScreen = (props) => {
    const item = props.route.params.item;
    const navigation = props.route.params.navigation;
    const isNewHabit = props.route.params.isNewHabit;

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
                    updateHabit(habitEntry._id, habitEntry);
                    navigation.navigate("Habits");
                }}
            >
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>

            {!isNewHabit && <TouchableOpacity
                onPress={() => deleteHabit(habitEntry._id)}
            >
                <Text style={styles.deleteButtonText}>Delete Habit</Text>
            </TouchableOpacity>
            }
            <TouchableOpacity
                onPress={() => navigation.navigate("Habits")}
            >
                <Text style={styles.deleteButtonText}>Cancel</Text>
            </TouchableOpacity>
        </>
    )
}

export default withNavigation(HabitEditScreen);