import { Pressable, View, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

// style lambda idea received here : https://stackoverflow.com/questions/34625829/change-button-style-on-press-in-react-native
//accepts Ionicon icon, size, color, onPress parameters which are given when this function is called
export default function IconButton({ icon, size, color, onPress }) {

    
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => pressed && styles.pressedButton}>
            <View style={styles.buttonContainer}>
                <Ionicons name={icon} size={size} color={color}></Ionicons>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({

    buttonContainer: {
        borderRadius: 24,
        padding: 6,
        marginHorizontal: 16,
        marginVertical: 2,
    },
    pressedButton: {
        opacity: .6,
    },
});