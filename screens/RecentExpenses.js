

import { useContext } from 'react';
import ExpensesOutput from '../components/ExpensesOutput';
import { ExpensesContext } from '../context/expensesContext';
import { getRecentDays } from '../utils/date';

export default function RecentExpenses() {

    const expensesContext = useContext(ExpensesContext); //data passing
    //only want to show recent expenses
    const recentExpenses = expensesContext.expenses.filter((expense) => {
        const today = new Date();
        const recentDate = getRecentDays(today, 14); // call getRecentDays function from utils and pass in todays date and -14 days from it
        return expense.date >= recentDate; //return where expense.date (object.prop)  is greate than above result (more recent that 14 days ago basically)
    });

    return <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 14 Days" />;

}

