import React, { useState, useEffect, Component } from 'react';
import { withNavigation } from 'react-navigation';
import { Text, Button, StyleSheet } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import HabitItem from '../components/HabitItem';
import Spacer from '../components/Spacer';
import habitApi from '../api/habitApi';
import { getTodayEntry, createEntry } from '../repository/entriesRepository';
import { getHabits } from '../repository/habitsRepository';
import { diaryEntryToHabitList } from '../helpers/dataTransform';

const HabitScreen = ({ navigation }) => {

    const [habitEntry, setHabitEntry] = useState([]);

    const toggleCompleteStatus = (id) => {

        const newHabitEntry = habitEntry.map((entry) => {
            if (entry._id === id) {
                return { ...entry, done: !entry.done };
            } else {
                return { ...entry };
            }
        });

        setHabitEntry(newHabitEntry);
    }


    useEffect(() => {
        const fetchData = async () => {
            const todayEntry = getTodayEntry();

            if (todayEntry.length != 0) {
                setHabitEntry(diaryEntryToHabitList(todayEntry));

            } else {
                const habits = getHabits();
                let newEntries = [];
                let newHabitList = [];

                for (let habit of data) {
                    newHabitList.push({ ...habit, done: false, notes: "" });
                    newEntries.push({ habit: habit._id, done: false, notes: "" });
                }
                setHabitEntry(newHabitList);

                try {
                    await habitApi.post('/entry', { date: new Date(), entry: newEntries });
                } catch (e) {
                    console.log(e);
                }
            }
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
