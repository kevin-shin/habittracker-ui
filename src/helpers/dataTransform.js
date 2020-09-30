const habitToEntryForm = (habit, done = false, notes = "") => {
    const { name, remindTime, repeat, _id } = habit;
    let entry = {
        habit: _id,
        done,
        notes
    }
    return entry;
}

const diaryEntryToHabitList = (diaryEntry) => {
    let habitList = diaryEntry.map(x => {
        return {
            ...x.habit, done: x.done, notes: x.notes
        }
    });

    return habitList;
}



export { diaryEntryToHabitList, habitToEntryForm };