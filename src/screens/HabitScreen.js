import React, { useState, useEffect, Component } from 'react';
import { withNavigation } from 'react-navigation';
import { Text, Button, StyleSheet } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import HabitItem from '../components/HabitItem';
import Spacer from '../components/Spacer';
import { getTodayEntry, createEntry, updateEntry } from '../repository/entriesRepository';
import { getHabits } from '../repository/habitsRepository';
import { diaryEntryToHabitList, habitToEntryForm } from '../helpers/dataTransform';
import styles from '../../styles/HabitScreenStyles.js';

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

        setHabitEntry(newHabitEntry);
    }


    useEffect(() => {
        const fetchData = async () => {
            let data;
            let id;

            const todayEntryData = await getTodayEntry();
            if (todayEntryData.length != 0) {
                console.log("HIT TODAY ENTRY");
                const todayEntry = todayEntryData[0].entry;

                data = diaryEntryToHabitList(todayEntry);
                id = todayEntryData[0]._id;

                console.log(data);
            } else {
                console.log("hit else");
                let habits = await getHabits();
                let newEntries = habits.map(item => habitToEntryForm(item));
                console.log(newEntries);
                let newEntry = await createEntry(new Date(), newEntries);

                data = diaryEntryToHabitList(newEntry.entry);
                id = newEntry._id;
                console.log("------------->");
                console.log(data);
            }
            console.log("***********");
            console.log(data);
            setHabitEntry(data);
            setEntryId(id);
        }
        fetchData();
    }, []);

    return (
        <>
            <Spacer />
            {habitEntry.length != 0 && <FlatList
                keyExtractor={(item) => { return item._id; }}
                data={habitEntry}
                renderItem={({ item }) => {
                    // console.log("00000000------->");
                    // console.log(habitEntry); 
                    return (
                        <HabitItem
                            item={item}
                            navigation={navigation}
                            toggleCompleteStatus={toggleCompleteStatus}
                        ></HabitItem>
                    )
                }}
            />
            }
            <TouchableOpacity
                style={styles.addHabitButton}
                onPress={() => {
                    let newHabit = {
                        "name": "New Habit",
                        "remindTime": new Date(15980517300500),
                        "repeat": {}
                    };
                    navigation.navigate("Edit Habit", {
                        item: newHabit,
                        navigation,
                        isNewHabit: true
                    });
                }}
            >
                <Text style={styles.addHabitButtonText}>
                    Add Habit
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.addHabitButton}
                onPress={async () => { await updateEntry(entryId, habitEntry); }}
            >
                <Text style={styles.addHabitButtonText}>
                    Submit Entry
                </Text>
            </TouchableOpacity>


        </>
    );
}

export default HabitScreen;
