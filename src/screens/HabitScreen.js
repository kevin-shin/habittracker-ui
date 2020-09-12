import React, { useState, useEffect, Component } from 'react';
import { withNavigation } from 'react-navigation';
import { Text, Button, StyleSheet } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import HabitItem from '../components/HabitItem';
import Spacer from '../components/Spacer';
import habitApi from '../api/habitApi';
const axios = require('axios');

const HabitScreen = ({ navigation }) => {

    const [habits, setHabits] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const todayEntry = await habitApi.get('/entry/today');
            if (todayEntry.data.length != 0) {
                setHabits(todayEntry.data);
                console.log("hit here -- there is data");
            } else {
                console.log("hit else, new data! ");
                const returnedHabits = await habitApi.get('/habit');
                let newListofHabits = []
                let data = returnedHabits.data["0"];
                for (let habit of data) {
                    habit["complete"] = false;
                    newListofHabits.push(habit);
                }
                setHabits(newListofHabits);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <Spacer />
            <FlatList
                keyExtractor={(item) => item._id}
                data={habits}
                renderItem={({ item }) => {
                    return (
                        <HabitItem
                            item={item}
                            navigation={navigation}
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
