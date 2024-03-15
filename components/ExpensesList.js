import { Text, FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";
// function to extract description from item object
//wanna take in ExpenseItem component here to display items
// ChatGPTv3.5 how to properly render the itema below : https://chat.openai.com/share/40f46612-056c-41d2-9aaa-dedb7e9affa4
function renderExpenseItem(itemData) {
    return (

        <ExpenseItem
            id = {itemData.item.id}
            description={itemData.item.description}
            amount={itemData.item.amount}
            date={itemData.item.date} />

    );
}

export default function ExpensesList({ expenses }) {

    return (
        // will be sum of all expenses - Should be scrollable, should not render all of them incase theres too many
        // FlatList will allow this: https://reactnative.dev/docs/flatlist
        <FlatList
            data={expenses}
            renderItem={renderExpenseItem}
            keyExtractor={(item) => item.id}>
        </FlatList> // FlatList data prop looks for an array that it can handle internally
        //key extractor looks for a primary key for each item it loops through
    );
}
//use chatgptv3.5 to debub an error above : https://chat.openai.com/share/001eb93e-0dd4-4290-8971-a753ffc15144