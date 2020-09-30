import habitApi from '../api/habitApi';
import { habitToEntryForm } from '../helpers/dataTransform';

// READ
const getHabits = async () => {
    const habits = await habitApi.get('/habit');
    return habits.data["0"];
}

// CREATE
const createHabit = async (habit) => {
    try {
        const newHabit = await habitApi.post('/habit', { name: habit.name, repeat: habit.repeat, remindTime: habit.remindTime })
        return newHabit;
    } catch (e) {
        console.log(e);
    }
}

// UPDATE 
const updateHabit = async (id, habit) => {
    try {
        const params = {
            id,
            name: habit.name,
            repeat: habit.repeat,
            remindTime: habit.remindTime
        };
        const updatedHabit = await habitApi.put('/habit', params)
    } catch (e) {
        console.log(e);
    }
}

// DELETE

const deleteHabit = async (id) => {
    try {
        await habitApi.delete('/habit', { id });
    } catch (e) {
        console.log(e);
    }
}

export { getHabits, createHabit, updateHabit, deleteHabit };