import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';

const { width } = Dimensions.get('window'); 
const scale = width / 320;

// API Key for Words of the Day
export const apiKey = "5x5tk6pu1v1qp3nv820bb1ul2gy3h3d8aml1jy0ar7rsiljvl";

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

// Category Mode Coming Soon
function categoryMode() {
    Alert.alert("Coming Soon");
}

// Home Screen
const HomeScreen = ({ navigation }: RouterProps) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            
                {/* Game Title Area*/}
                <View style={styles.game_title_area}>
                    <View style={styles.logout_container}>
                        <TouchableOpacity onPress={() => FIREBASE_AUTH.signOut()}>
                            <Text style={styles.logout_button}>
                                <MaterialCommunityIcons name='logout' size={scale * 10} /> Logout
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.title}>Sort-4-Words</Text>
                </View>

                {/* Mode Selection Area */}
                <View style={styles.selection_area}>
                    {/* <TouchableOpacity onPress={() => navigation.navigate("Normal Mode")}> */}
                    <TouchableOpacity onPress={() => navigation.navigate("Normal Mode Selection Screen")}>
                        <Text style={styles.selection_buttons}>Normal Mode</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={categoryMode}>
                        <Text style={styles.selection_buttons}>Category Mode</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Words of the Day")}>
                        <Text style={styles.selection_buttons}>Words of the Day</Text>
                    </TouchableOpacity>
                </View>
        </SafeAreaView>
    )
}
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },

    game_title_area: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    title:{
        fontWeight: 'bold',
        fontSize: scale * 40
    },

    logout_container: {
        position: 'absolute',
        right: 0,
        top: 0
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

export default HomeScreen;