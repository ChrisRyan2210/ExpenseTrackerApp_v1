
import { TextInput, View, Text, StyleSheet} from 'react-native';
import { GlobalStyles } from '../constants/styles';

// this will be used for user data entry 
export default function Input({ label, textInputRules}) {

    let inputStyles = [styles.input];

    //checking if it is multine, if yes then assign the style variable to the TextInput
    if (textInputRules && textInputRules.multiline) {
        inputStyles.push(styles.multilineInput);
    } 

    return (

        <View style={styles.inputContainer}>
            <Text style={styles.label}>{ label }</Text>
            <TextInput {...textInputRules} style={inputStyles}></TextInput>
        </View>

    );

}
// https://reactnative.dev/docs/textinput
//using spread to set a bunch of rules as an object instead of seperately (lenght, num/alpha, etc.)

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 14,
        marginHorizontal: 5,
    },
    label: {
        fontSize: 12,
        color: GlobalStyles.colors.primary2,
        marginBottom: 5,
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary2,
        borderRadius: 5,
        padding: 7, 
        fontSize: 17, 
        color: GlobalStyles.colors.primary700,
    },
    multilineInput: {
        minHeight: 100, 
        textAlignVertical: 'top',
    }
});