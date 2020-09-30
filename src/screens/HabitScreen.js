import React, { useState, useEffect, Component } from 'react';
import { withNavigation } from 'react-navigation';
import { Text, Button, StyleSheet } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import HabitItem from '../components/HabitItem';
import Spacer from '../components/Spacer';
import habitApi from '../api/habitApi';
import { getTodayEntry, createEntry, updateEntry } from '../repository/entriesRepository';
import { getHabits } from '../repository/habitsRepository';
import { diaryEntryToHabitList, habitToEntryForm } from '../helpers/dataTransform';

const HabitScreen = ({ navigation }) => {

    const [habitEntry, setHabitEntry] = useState([]);
    const [entryId, setEntryId] = useState("");

    const toggleCompleteStatus = async (id) => {
        let newHabitEntry = habitEntry.map((entry) => {
            if (entry._id === id) {
                return { ...entry, done: entry.done ? !entry.done : true };
            } else {
                return { ...entry };
            }
        });

        newHabitEntry = await updateEntry(entryId, newHabitEntry);
        setHabitEntry(newHabitEntry);
    }


    useEffect(() => {
        const fetchData = async () => {
            let data;
            let id;

            const todayEntryData = await getTodayEntry();
            if (todayEntryData.length != 0) {
                const todayEntry = todayEntryData[0].entry;
                
                data = diaryEntryToHabitList(todayEntry);
                id = todayEntryData[0]._id;
            } else {
                let habits = await getHabits();
                let newEntries = habits.map(item => habitToEntryForm(item));
                let newEntry = await createEntry(new Date(), newEntries);

                data = diaryEntryToHabitList(newEntry.entry);
                id = newEntry._id;
            }

            setHabitEntry(data);
            setEntryId(id);
        }
        fetchData();
    }, []);

    return (
        <>
            <Spacer />
            <FlatList
                keyExtractor={(item) => item._id}
                data={habitEntry}
                renderItem={({ item }) => {
                    return (
                        <HabitItem
                            item={item}
                            navigation={navigation}
                            toggleCompleteStatus={toggleCompleteStatus}
                        ></HabitItem>
                    )
                }}
            />
            <TouchableOpacity
                style={styles.addHabitButton}
                onPress={() => {
                    let newHabit = {
                        "name": "New Habit",
                        "remindTime": new Date(15980517300500),
                        "repeat": {}
                    };
                    navigation.navigate("Edit Habit", { item: newHabit });
                }}
            >
                <Text style={styles.addHabitButtonText}>
                    Add Habit
                </Text>
            </TouchableOpacity>

        </>
    );
}

const styles = StyleSheet.create({
    addHabitButton: {
        marginBottom: 20,
        alignSelf: "center"
    },
    addHabitButtonText: {
        fontSize: 20,
        color: "blue"
    }
})
export default HabitScreen;
