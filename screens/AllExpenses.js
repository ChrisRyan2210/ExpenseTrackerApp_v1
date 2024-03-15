
import ExpensesOutput from '../components/ExpensesOutput';
import { useContext } from 'react';
import { ExpensesContext } from '../context/expensesContext';

export default function AllExpenses() {

    const expensesContext = useContext(ExpensesContext); //data passing

    return <ExpensesOutput expenses={expensesContext.expenses} expensesPeriod="Total"/>;

}

