import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { NavigationProp } from '@react-navigation/native';

const { width } = Dimensions.get('window'); 
const scale = width / 320;

import { retrieveWordsOfTheDay, globalWordsOfTheDay, getWordsDefinitions } from '../../firestore/importExportFirestore';
// Load Temporary Words Of The Day
import { wordsWord, wordsClass, wordsDefinition, wordsExample, wordsPronounce } from '../../firestore/tempWordOfTheDayLists';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const WordsOfTheDayScreen = ({ navigation}: RouterProps) => {
    const [wordsList, setWordsList] = useState([]);
    const [wordsClassList, setWordsClassList] = useState([]);
    const [wordsDefinitionList, setWordsDefinitionList] = useState([]);
    const [wordsExampleList, setWordsExampleList] = useState([]);
    const [wordsPronounceList, setWordsPronounceList] = useState([]);
    const [indexCounter, setIndexCounter] = useState(0);

    // Get Words of the Day
    useEffect(() => {
        const fetchData = async () => {
            try {
                retrieveWordsOfTheDay();
                // setWordsList(globalWordsOfTheDay); // Actual Value from Firestore
                
                // Temporary Value
                setWordsList(wordsWord);
                setWordsClassList(wordsClass);
                setWordsDefinitionList(wordsDefinition);
                setWordsExampleList(wordsExample);
                setWordsPronounceList(wordsPronounce);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    // Counter functions
    function increaseIndex() {
        setIndexCounter(indexCounter + 1);
    }
    
    function decreaseIndex() {
        setIndexCounter(indexCounter - 1);
    }

    const PrevNextButton = () => {
        if (indexCounter < 1) {
            return (
                <View style={styles.next_only_container}>
                    <View style={styles.next_container}>
                        <TouchableOpacity onPress={() => increaseIndex()}>
                            <Text style={styles.prev_next_text}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        else if(indexCounter < (wordsList.length - 1)){
            return (
                <View style={styles.prev_next_container}>
                    <View style={styles.prev_container}>
                        <TouchableOpacity onPress={() => decreaseIndex()}>
                            <Text style={styles.prev_next_text}>Previous</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.next_container}>
                        <TouchableOpacity onPress={() => increaseIndex()}>
                            <Text style={styles.prev_next_text}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        else {
            return (
                <View style={styles.prev_next_container}>
                    <View style={styles.prev_container}>
                        <TouchableOpacity onPress={() => decreaseIndex()}>
                            <Text style={styles.prev_next_text}>Previous</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }

    return (
        <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
            {/* Header Area */}
            <View style={styles.header_area}>
                <View style={styles.back_container}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name="arrow-left" size={scale * 20} />
                </TouchableOpacity>
                </View>
                <Text style={styles.word_header}>{wordsList[indexCounter]}</Text>
                {/* <Text style={styles.word_header}>treacly</Text> */}
                <Text style={styles.word_pronounce}>{wordsPronounceList[indexCounter]}</Text>
            </View>

            {/* Word Content */}
            <View style={styles.word_content_area}>
                <ScrollView>
                    <View style={styles.definition_set}>
                    <Text style={styles.word_class}>{wordsClassList[indexCounter]}</Text>
                    <Text style={styles.word_definition}>{wordsDefinitionList[indexCounter]}</Text>
                    <Text style={styles.word_example}>{wordsExampleList[indexCounter]}</Text>
                    </View>
                </ScrollView>
                <PrevNextButton />
            </View>
        </SafeAreaView>
    );
}

export default WordsOfTheDayScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },

    header_area: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    back_container: {
        position: 'absolute',
        left: 0,
        top: scale * 10
    },
    
    word_header: {
        fontSize: scale * 48,
        fontWeight: 'bold',
        color: 'mediumblue'
    },

    word_pronounce:{
        fontSize: scale * 12,
    },

    word_content_area: {
        flex: 3,
        padding: scale * 10
    },

    definition_set: {
        borderBottomWidth: 1,
        borderColor: 'lightgrey'
    },

    word_class: {
        fontStyle: 'italic',
        fontSize: scale * 14,
        marginVertical: scale * 10
    },

    word_definition: {
        fontSize: scale * 18,
        marginVertical: scale * 10
    },

    word_example: {
        fontSize: scale * 16,
        marginVertical: scale * 10
    },

    prev_next_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    next_only_container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },

    prev_container: {
        backgroundColor: 'lightgrey',
        borderWidth: 1,
        paddingHorizontal: scale * 10,
        paddingVertical: scale * 5,
        // right: 0
    },

    next_container: {
        backgroundColor: 'lightgrey',
        borderWidth: 1,
        paddingHorizontal: scale * 10,
        paddingVertical: scale * 5,
    },

    prev_next_text: {
        fontSize: scale * 12,
        fontWeight: 'bold'
    }
});
