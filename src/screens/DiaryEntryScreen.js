import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Text } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { getEntry, getEntries, getTodayEntry } from '../repository/entriesRepository';
import EntryHabitItem from '../components/EntryHabitItem';

const changeEntryforDate = async (inputDate, setHabitEntryFunction) => {
    let dateFilter = { year: inputDate.year, month: inputDate.month, day: inputDate.day };
    const entry = await getEntry(dateFilter);
    const habitEntry = entry[0].entry;
    setHabitEntryFunction(entry[0].entry);
}

const computeMarkedDate = (month) => {

}

const DiaryEntryScreen = () => {
    const [habitEntry, setHabitEntry] = useState([]);
    const [habitEntries, setHabitEntries] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            let today = new Date();
            let todayInfo = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
            const todayEntryData = await getEntry(todayInfo);
            const entriesMonth = await getEntry();

            setHabitEntry(todayEntryData[0].entry);
            setHabitEntries(entriesMonth);
        }
        fetchData();
    }, []);


    return (
        <>
            <Calendar
                maxDate={new Date()}
                onDayPress={(day) => {
                    changeEntryforDate(day, setHabitEntry)
                }}
                onMonthChange={(month) => computeMarkedDate(month)}
                monthFormat={'MMM yyyy'}
                hideArrows={false}
                hideExtraDays={false}
                markedDates={{}}
                markingType={'period'}
            />
            <FlatList
                keyExtractor={(item) => { return item._id; }}
                data={habitEntry}
                style={styles.flatListStyle}
                renderItem={({ item }) => {
                    return (
                        <EntryHabitItem
                            item={item}
                        />
                    )
                }}
            />
        </>
    )
}

const styles = StyleSheet.create({
    flatListStyle: {
        flex: 1,
        margin: 30,
        paddingTop: 15

    }
})
export default DiaryEntryScreen;