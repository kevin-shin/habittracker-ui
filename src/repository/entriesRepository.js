import habitApi from '../api/habitApi';


// READ
const getEntry = async (filterConditions) => {
    const entry = await habitApi.get('/entry', { params: { ...filterConditions } });
    return entry.data;
}

// CREATE
const createEntry = async (date, entry) => {
    try {
        let newEntry = await habitApi.post('/entry', { ...date, entry });
        return newEntry.data;
    } catch (e) {
        console.log(e);
    }
}

// UPDATE
const updateEntry = async (id, entry) => {
    try {
        let updatedEntry = await habitApi.put('/entry', { id, entry });
        return updatedEntry.data;
    } catch (e) {
        console.log(e);
    }
}

export { createEntry, updateEntry, getEntry };