import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';

const { width } = Dimensions.get('window'); 
const scale = width / 320;

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

// Normal Mode Selection Screen
const NormalModeSelectionScreen = ({ navigation }: RouterProps) => {
    return (
        <SafeAreaView style={styles.container}>
            {/* Mode Title Area*/}
            <View style={styles.category_title_area}>
                <View style={styles.back_container}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons name="arrow-left" size={scale * 20} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.title}>Normal Mode</Text>
            </View>

            {/* Difficulty Selection Area */}
            <View style={styles.selection_area}>
                <TouchableOpacity onPress={() => navigation.navigate("Normal Easy Mode")}>
                    <Text style={styles.select_difficulty_button}>Easy Mode</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Normal Hard Mode")}>
                    <Text style={styles.select_difficulty_button}>Hard Mode</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Normal Zen Mode")}>
                    <Text style={styles.select_difficulty_button}>Zen Mode</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default NormalModeSelectionScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },

    category_title_area: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    title:{
        fontWeight: 'bold',
        fontSize: scale * 40
    },
    
    back_container: {
        position: 'absolute',
        left: 0,
        top: scale * 10
    },

    logout_button: {
        fontSize: scale * 10,
        backgroundColor: 'lightgray',
        padding: scale * 5,
        borderWidth: 1,
        borderRadius: 18,
        marginVertical: scale * 20
    },

    selection_area: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    selection_buttons: {
        fontSize: scale * 28,
        backgroundColor: 'lightgray',
        padding: scale * 10,
        borderWidth: 1,
        borderRadius: 18,
        marginVertical: scale * 20
    },

    difficulty_selection_area: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    select_difficulty_button: {
        fontSize: scale * 28,
        backgroundColor: 'lightgray',
        padding: scale * 10,
        borderWidth: 1,
        borderRadius: 18,
        marginVertical: scale * 30
    },
});

