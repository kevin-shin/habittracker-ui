import habitApi from '../api/habitApi';

const getHabits = async () => {
    const habits = await habitApi.get('/habit');
    return habits.data["0"];
}

export { getHabits };