import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, createAppContainer } from '@react-navigation/stack';
import HabitScreen from './src/screens/HabitScreen';
import DiaryEntryScreen from './src/screens/DiaryEntryScreen';
import HabitEditScreen from './src/screens/HabitEditScreen';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const HabitStack = createStackNavigator();

const DiaryEntryStack = createStackNavigator();

function splitStackScreen() {
  return (
    <Tab.Navigator
      tabBarOptions={tabBarOptions}
    >
      <Tab.Screen
        name="Habit"
        component={HabitScreen} />
      <Tab.Screen
        name="DiaryEntry"
        component={DiaryEntryScreen} />
    </Tab.Navigator>
  )
}

const tabBarOptions = {
  activeTintColor: "white",
  activeBackgroundColor: "#1261A0",
  labelStyle: {
    fontSize: 16,
  },
  tabStyle: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center"
  }
}

const App = () => {
  return (
    <NavigationContainer>
      <HabitStack.Navigator>
        <HabitStack.Screen
          name="Habits"
          component={splitStackScreen}
          options={{ tabBarLabel: "Habits" }}
        />
        <HabitStack.Screen
          name="Edit Habit"
          component={HabitEditScreen}

        />
      </HabitStack.Navigator>
    </NavigationContainer>
  )
}

export default App;