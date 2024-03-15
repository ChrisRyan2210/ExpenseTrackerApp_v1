import { Pressable, StyleSheet, View, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";



export default function Button({ children, onPress, mode }) {

    return (
        <View>
            <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressedButton}>
                <View style={[styles.button, mode === 'flat' && styles.other]}>
                    <Text style={[styles.buttonText, mode === 'flat' && styles.otherText]}>{children}</Text>
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
   
    button: {
        borderRadius: 4, 
        padding: 10, 
        backgroundColor: GlobalStyles.colors.primary500,
        marginVertical: 8,
    },
    other: {
        backgroundColor: 'transparent',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    otherText: {
        color: GlobalStyles.colors.primary3,
    },
    pressedButton: {
        opacity: .6,
        backgroundColor: GlobalStyles.colors.primary2,
        borderRadius: 6,
    },

});