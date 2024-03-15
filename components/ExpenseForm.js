import { View, StyleSheet, Alert} from 'react-native';
import Input from './Input';
import { useState } from 'react';
import Button from '../components/UIElements/Button';
import { GlobalStyles } from '../constants/styles';

// this will be used for user data entry 
export default function ExpenseForm({submitBtnLabel, onCancel, onSubmit, defaultValues}) {

    //instead of havign 3 seperate useStates & funcitons for amount, description, date - I can have one useState and one function that accepts an object = {desc, amt, date}

    const [inputValues, setInputValues] = useState({//useState hook
        amount: defaultValues ? defaultValues.amount.toString() : '',
        date: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : '', //https://chat.openai.com/share/3fe3fb19-d6ff-4646-8995-b3f91fefb723 : how to extract first 10 char
        description: defaultValues ? defaultValues.description : '',
    });

    //because of above, in the case where not all values are changing, i need to still keep the old state values and set it to stay the same
    function inputChangeHandler(inputID,  valueEntered) {
        
        setInputValues((currentInputValues) => {
            
            return {
                ...currentInputValues,
                [inputID]: valueEntered
            };
        });
    }

    function confirmHandler() {
        const expenseInfo = {
            amount: +inputValues.amount,// + converts string to amount
            date: new Date(inputValues.date),//convert to date
            description: inputValues.description,
        };

        //validation for data entry
        const amountValidation = !isNaN(expenseInfo.amount) && expenseInfo.amount> 0; //check if number - https://aboutreact.com/react-native-isnan-to-check-value-is-a-number-or-not/#:~:text=The%20function%20isNaN()%20is,is%20a%20number%20or%20not.
        const dateValidation = expenseInfo.date.toString() !== 'Invalid Date'; // learned this trick doing The Odin Project Coding Course
        const descriptionValidation = expenseInfo.description.trim().length > 0;   //classic

        if (!amountValidation || !descriptionValidation || !dateValidation) {
            Alert.alert('Data is invalid, please fix and try again!')

            return;
        }

        onSubmit(expenseInfo);
    }

    return (

        <View>
            <Input label="Amount" textInputRules={{
                keyboardType: 'decimal-pad',
                onChangeText: inputChangeHandler.bind(this, 'amount'),
                value: inputValues.amount,
            }}>
            </Input>
            <Input label="Date" textInputRules={{
                placeholder: 'YYYY-MM-DD',
                maxLength: 10,
                onChangeText: inputChangeHandler.bind(this, 'date'),
                value: inputValues.date,
            }}>
            </Input>
            <Input label="Description" textInputRules={{
                multiline: true,
                autoCorrect: true,
                autoCapitalize: 'sentences',
                onChangeText: inputChangeHandler.bind(this, 'description'),
                value: inputValues.description,
            }}>
            </Input>
            <View>
                <Button mode="flat" onPress={onCancel}>
                    Cancel
                </Button>
                <Button onPress={confirmHandler}>
                    {submitBtnLabel}
                </Button>
            </View>
        </View>

    );

}
// https://reactnative.dev/docs/textinput
// all rules are from above link too 
//https://www.w3schools.com/js/js_function_bind.asp bind() used above from w3 schools
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
