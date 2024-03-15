
//Main References for this project: 
  // - React Dev Tools - Links seen throughout 
  // - Personal Project based off Udemy code-along project by Maximilian Schwarzmuller
  // - Some ideas/built-in functions from The Odin Project (free online coding course) 
  // - Minor use of ChatGPTv3.5 for bug fixes or recommendations - links seen throughout

import { StatusBar } from 'expo-status-bar';
import React from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

//importing custom components
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { GlobalStyles } from './constants/styles';
import IconButton from './components/UIElements/IconButton';
import ExpensesContextProvider from './context/expensesContext';

const Stack = createNativeStackNavigator();// this stack will create an object that gives access to 2 components (nav, register screens): https://reactnavigation.org/docs/native-stack-navigator
const BottomTabs = createBottomTabNavigator(); // allows bottom tab navigation: npm install @react-navigation/bottom-tabs
// using the colours from styles.js in constants folder to assign styles. Global styles is name of function
//this function handles the bottom tab navigator
function ExpensesOverview() {
  return (
    <BottomTabs.Navigator screenOptions={({ navigation }) => ({
      
      headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      headerTintColor: 'white',
      tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="add-circle-outline"
          size={26} color={tintColor}
          onPress={() => {
            navigation.navigate('ManageExpense');
          }}>
        </IconButton>
      ),
    })}
    >
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'View Recent',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time-outline" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'View All',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="globe-outline" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}
// gonna wrap the nav container in the expenseContext component to pass data
export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            headerTintColor: 'white',
            headerBackTitle: 'Back',
          }}>
            <Stack.Screen
              name="ExpensesOverview"
              component={ExpensesOverview}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpense}
              options={{
                presentation: 'modal',
              }} />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
};

{/* setting up navigation */ }
{/* StackNavigator allows me to dynamically load the tabs options based on which screen is selected*/ }
{/* below uses the custom function above to display both options in one bottom tab */ }
// this hides the header for the unselected tab
// Set presenation for Manage Expense as Modal : https://reactnative.dev/docs/modal
//Ioniocn icons from this page: https://ionic.io/ionicons