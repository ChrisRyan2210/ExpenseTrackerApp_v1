// using react Context to pass and read data througout the app --https://react.dev/reference/react/createContext
// youtube video helped explain useReducer kinda... https://www.youtube.com/watch?v=kK_Wqx3RnHk&ab_channel=WebDevSimplified
//a lot of new stuff, kind of confused 
//https://www.youtube.com/watch?v=HYKDUF8X3qI&ab_channel=CosdenSolutions
//https://www.youtube.com/watch?v=5LrDIWkK_Bc&ab_channel=WebDevSimplified
import { createContext, useReducer } from 'react';

const DUMMY_EXPENSES = [
    {
        id: 'el',
        description: 'A pair of headphones',
        amount: 120.99,
        date: new Date('2024-03-12')
    },
    {
        id: 'e2',
        description: 'Tattoo',
        amount: 256.99,
        date: new Date('2024-02-09')
    },
    {
        id: 'e3',
        description: 'RAM',
        amount: 40.69,
        date: new Date('2024-01-22')
    },
    {
        id: 'e4',
        description: 'Food',
        amount: 12.99,
        date: new Date('2024-01-02')
    },
    {
        id: 'e5',
        description: 'Takeaway',
        amount: 16.78,
        date: new Date('2024-01-23')
    },
    {
        id: 'e6',
        description: 'Spotify',
        amount: 10.99,
        date: new Date('2024-02-09')
    },
    {
        id: 'e7',
        description: 'Youtube Premium',
        amount: 6.99,
        date: new Date('2024-03-17')
    },
    {
        id: 'e8',
        description: 'Food',
        amount: 12.99,
        date: new Date('2024-01-02')
    },
    {
        id: 'e9',
        description: 'Book',
        amount: 9.99,
        date: new Date('2024-03-11')
    }
];

// uppercase as it will be used as a component
export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => { },
    deleteExpense: (id) => { },
    updateExpense: (id, { description, amount, date }) => { },
}); 
//above we are defining the object contextData 
// an array of expense methods
// - addExpense expects an object, hense {desc, amt, date} - no id as it is auto added as primary key
// deleteExpense expects just ID as thats how it finds and deletes the expense
// updateExpense expects an id to find the right db row to update, then an object {desc, amt, date} of data to actually update
// LEARNING NOTE: that {desc, amt, date} is an object that is passed as 1 param to the method, so its not 4 params, its 2.

//reducer function below - alot of built in things being used 
function expensesReducer(state, action) {
    switch (action.mode) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString(); // just creating a random number and assigngign to ID - change this for database
            return [{ ...action.data, id: id }, ...state];
        case 'UPDATE': 
            const itemIndex = state.findIndex((expense) => expense.id === action.data.id); //finding INDEX of the expense (not expense itself) using built in index function for array
            const updatableExpense = state[itemIndex];  //get the expense itself usign index above
            const updatedItem = { ...updatableExpense, ...action.data.data }; // update the item data using data passed in from data.expenseData 
            const updatedExpenses = [...state]; 
            updatedExpenses[itemIndex] = updatedItem; // overwrite the item data
            return updatedExpenses; // return the new array with the new item in it
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.data); //just returning the array where id is not equal to id passed into function
        default: 
            return state;
    }
}


//below function actually holds the data when used later
export default function ExpensesContextProvider({ children }) {

    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);
    
    function addExpense(expenseData) {

        dispatch({ mode: 'ADD', data: expenseData });

    }

    function deleteExpense(id) {

        dispatch({mode: 'DELETE', data: id});

    }

    function updateExpense(id, expenseData) {

        dispatch ({mode: 'UPDATE', data: {id: id, data: expenseData}});

    }
    

    const value = {

        expenses: expensesState, 
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    };
    useReducer(); //built in hook for state management similar to useState :https://react.dev/reference/react/useReducer
    //component above being called below
    return (

        <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>

    );
}