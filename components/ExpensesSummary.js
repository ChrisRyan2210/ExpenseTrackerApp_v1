import { Text, View, StyleSheet} from 'react-native';
import { GlobalStyles } from '../constants/styles';

export default function ExpensesSummary({ expenses, periodName }) { 

    
    const sumOfExpenses = expenses.reduce((sum, expense) => {
        return sum + expense.amount
    }, 0); 

    return (
        <View style={styles.container}>
            <Text style={styles.timePeriod}>{periodName}</Text>
            <Text style={styles.totalSum}>${sumOfExpenses.toFixed(2)}</Text> 
        </View>
    );
}

const styles = StyleSheet.create({

    //set up general style for the container
    container: {
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary1,
        borderRadius: 6,
        flexDirection: 'row', //change this potentially
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    timePeriod: {
        fontSize:16,
        color: GlobalStyles.colors.primary4,
    },
    totalSum: {
        fontWeight: 'bold',
        fontSize:16,
        color: GlobalStyles.colors.primary500
    }
});

//reduce is built in function : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce- basically loops through the array of expenses and sums them while also carrying the objects too 
// period name here is just whatever amount of days I choose (7 prob) - also needs to be set as prop in ExpOutput
// this is basically a really shit for loop and I hate it