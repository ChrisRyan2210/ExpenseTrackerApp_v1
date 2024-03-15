import { Pressable, StyleSheet, View, Text } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { getFormattedDate } from "../utils/date";
import { useNavigation} from '@react-navigation/native';

//gonna be used to be abe to add/delete items later if have time.
// this gets passed to ExpenseList fro dispay items 

export default function ExpenseItem({ id, description, amount, date }) {
    //gonna flex desc/amount in column and next to date in one bigger flex
    const navigation = useNavigation(); //navigation HOOK

    function expensePressHandler() {
        //function is the onPress for each item so they can be opened and edited
        navigation.navigate('ManageExpense', {
            expenseID: id
        }); // this hook from above allows us to navigate screens. Using ManageExpense name from App.js
        //Need to forward the id of the expense I want to edit

    }

    return (

        <Pressable
            onPress={expensePressHandler}
            style={({ pressed }) => pressed && styles.pressedButton}>
            <View style={styles.item}>
                <View>
                    <Text style={[styles.generalCSS, styles.description]}>{description}</Text>
                    <Text style={styles.generalCSS}>{getFormattedDate(date)}</Text>
                </View>
                <View style={styles.itemAmountContainer}>
                    <Text style={styles.itemAmountText}>{amount.toFixed(2)}</Text>
                </View>
            </View>
        </Pressable>

    );
}

const styles = StyleSheet.create({
    item: {
        padding: 12,
        marginVertical: 7,
        backgroundColor: GlobalStyles.colors.primary500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
        elevation: 3, //shadow
        shadowColor: GlobalStyles.colors.gray500, //shadow settings- mess around with at end
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: .04,
    },
    generalCSS: {
        color: GlobalStyles.colors.primary1,
    },
    description: {
        fontSize: 16,
        margin: 4,
        fontWeight: 'bold',
    },
    itemAmountContainer: {
        minWidth: 90,
        paddingHorizontal: 10,
        paddingVertical: 4,
        backgroundColor: '#333333',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    itemAmountText: {
        color: GlobalStyles.colors.primary500,
        fontWeight: 'bold',
        color: 'white'
    },
    pressedButton: {
        opacity: .7,
    },
});