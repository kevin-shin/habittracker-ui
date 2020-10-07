import habitApi from '../api/habitApi';

// READ
const getTodayEntry = async () => {
    const todayEntry = await habitApi.get('/entry/today');
    return todayEntry.data;
}

// CREATE
const createEntry = async (date, entry) => {
    try {
        let newEntry = await habitApi.post('/entry', { date, entry });
        return newEntry.data;
    } catch (e) {
        console.log(e);
    }
}

// UPDATE
const updateEntry = async (id, entry) => {
    try {
        console.log("UPDATED ENTRY BEFORE");
        console.log(entry);
        let updatedEntry = await habitApi.put('/entry', { id, entry });
        return updatedEntry.data;
    } catch (e) {
        console.log(e);
    }
}

export { getTodayEntry, createEntry, updateEntry };