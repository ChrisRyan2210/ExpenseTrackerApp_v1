import React, { useLayoutEffect } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import IconButton from '../components/UIElements/IconButton';
import { GlobalStyles } from '../constants/styles';
import Button from '../components/UIElements/Button';
import { ExpensesContext } from '../context/expensesContext';
import { useContext } from 'react';
import ExpenseForm from '../components/ExpenseForm';

export default function ManageExpense({ route, navigation }) {// uses route (from Navigator library), then check if route exists, then get ID
    //in 'Manage', user either is adding new or updating existing, need to account for that here
    const editExpenseID = route.params?.expenseID;// know that if editing expense, an ID will need to be passed to the function to laod the data, so I can filter based ont the param/prop. Route = ID
    const expensesContext = useContext(ExpensesContext);
    // below converts value to boolean. got here: https://www.samanthaming.com/tidbits/19-2-ways-to-convert-to-boolean/ . allows me to use boolen to go one way or other
    const isEditable = !!editExpenseID;

    const findExpense = expensesContext.expenses.find((expense) => expense.id === editExpenseID);//finding the selected expense to auto fill info when updating

    useLayoutEffect(() => {// useLayoutEffect : https://react.dev/reference/react/useLayoutEffect
        navigation.setOptions({
            title: isEditable ? 'Edit Expense' : 'Add Expense'//setting title of the page depending
        });
    }, [navigation, isEditable]);

    //all 3 functions below should close the modal once they execute - gonna use navigation
    //delete expense function
    function deleteExpenseHandler() {
        //call the delet expense function from context.js 
        expensesContext.deleteExpense(editExpenseID);
        navigation.goBack();// built in function to close the modal
    }

    function cancelHandler() {

        navigation.goBack();// built in function to close the modal
    }

    function confirmHandler(expenseInfo) {
        //check if either updateing or adding new
        if (isEditable) {
            expensesContext.updateExpense(editExpenseID, expenseInfo);
        } else {
            expensesContext.addExpense(expenseInfo);
        }
        navigation.goBack();// built in function to close the modal
    }

    return (

        <View style={styles.container}>
            <ExpenseForm
                onCancel={cancelHandler}
                submitBtnLabel={isEditable ? 'Update' : 'Add'}
                onSubmit={confirmHandler}
                defaultValues={findExpense}>
            </ExpenseForm>
            {isEditable && (
                <View style={styles.deleteContainer}>
                    <IconButton
                        icon="trash-outline"
                        color={GlobalStyles.colors.error500}
                        size={42}
                        onPress={deleteExpenseHandler}>
                    </IconButton>
                </View>
            )}
        </View>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1, //to make it fit the page
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary3,
        alignItems: 'center',
    },
});







