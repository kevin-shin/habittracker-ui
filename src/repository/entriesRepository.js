import habitApi from '../api/habitApi';

const getTodayEntry = async () => {
    const todayEntry = await habitApi.get('/entry/today');
    return todayEntry.data;
}

const createEntry = async (date, entry) => {
    try {
        await habitApi.post('/entry', { date, entry });
    } catch (e) {
        console.log(e);
    }
}

export { getTodayEntry, createEntry };