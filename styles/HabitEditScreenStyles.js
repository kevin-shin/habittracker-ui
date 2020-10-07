import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    habitName: {
        height: 50,
        fontSize: 25,
        paddingLeft: 40,
        paddingRight: 20,
        marginBottom: 10
    },
    saveButton: {
        alignSelf: "center",
        backgroundColor: "#1261A0",
        borderRadius: 10
    },
    deleteButtonText: {
        alignSelf: "center",
        marginTop: 45,
        fontSize: 22,
        color: "#1261A0"
    },
    buttonText: {
        fontSize: 25,
        color: "white",
        padding: 15,
        paddingLeft: 25,
        paddingRight: 25
    },
    checkBoxContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 10
    },
    weekday: {
        alignSelf: "flex-start",
        padding: 15,
        marginLeft: 12,
        marginRight: 12
    },
    checkedWeekday: {
        backgroundColor: "gray"
    },
    uncheckedWeekday: {
        backgroundColor: "white"
    },
    remindTimeText: {
        fontSize: 20,
        marginLeft: 40,
        marginTop: 30
    }
});
