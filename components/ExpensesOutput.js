import { View, Text, StyleSheet} from 'react-native';

import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import { GlobalStyles } from '../constants/styles';



// expenses here is really an object or array of objects with props (e.g price, name, date, whatever)
// this component will output a summary and list of all expenses
export default function ExpensesOutput({ expenses, expensesPeriod }) { 

    return (
        <View style={styles.container}>
            <ExpensesSummary expenses={expenses} periodName={expensesPeriod} /> 
            <ExpensesList expenses={expenses} /> 
        </View>
    );
}
// styling here will change the stylign for summary/list as it is the main component that is called in the different screens
const styles = StyleSheet.create({
// this container is like the main part of the screen
    container: {
        backgroundColor: GlobalStyles.colors.primary700,
        paddingHorizontal: 24,
        paddingTop: 24,
        flex: 1, // flex 1 makes the container take up all the available screen: https://stackoverflow.com/questions/37386244/what-does-flex-1-mean
    }
});
