import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { NavigationProp } from '@react-navigation/native';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';

import { updateHighScore } from '../../firestore/importExportFirestore';
import { globalUserId } from '../../../App';

const { width } = Dimensions.get('window'); 
const scale = width / 320;
const minChar = 2;
const maxChar = 10;

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

// Random Letter Generator
function random_letter() {
    const getRandomNumber = Math.floor(Math.random() * 26);
    // Note: ASCII Values for Capital Letter Ranges from 65 to 90
    const numToLetter = String.fromCharCode(getRandomNumber + 65);
    return numToLetter;
}

// To Validate Word against Wordlist in Database
// A boolean to indicate if the word is valid and can increase score
let wordIsVal1 = false;
let wordIsVal2 = false;
let wordIsVal3 = false;
let wordIsVal4 = false;

type WordToBeValidated = { wordToBeVal: string; }

// Checking Word against Wordlist Database
function ValidateWord1( props: WordToBeValidated ) {
    const theWord = props.wordToBeVal.join("");
    if(theWord.length > 1 && theWord.length < 11) {
        const db = useSQLiteContext();
        const wordIsValid = db.getAllSync('SELECT * FROM Words WHERE word = ?', [theWord.toLowerCase()]);

        if(wordIsValid.length > 0) wordIsVal1 = true;
        else wordIsVal1 = false;
        return 
    }
}

function ValidateWord2( props: WordToBeValidated ) {
    const theWord = props.wordToBeVal.join("");
    if(theWord.length > 1 && theWord.length < 11) {
        const db = useSQLiteContext();
        const wordIsValid = db.getAllSync('SELECT * FROM Words WHERE word = ?', [theWord.toLowerCase()]);

        if(wordIsValid.length > 0) wordIsVal2 = true;
        else wordIsVal2 = false;
        return 
    }
}

function ValidateWord3( props: WordToBeValidated ) {
    const theWord = props.wordToBeVal.join("");
    if(theWord.length > 1 && theWord.length < 11) {
        const db = useSQLiteContext();
        const wordIsValid = db.getAllSync('SELECT * FROM Words WHERE word = ?', [theWord.toLowerCase()]);

        if(wordIsValid.length > 0) wordIsVal3 = true;
        else wordIsVal3 = false;
        return 
    }
}

function ValidateWord4( props: WordToBeValidated ) {
    const theWord = props.wordToBeVal.join("");
    if(theWord.length > 1 && theWord.length < 11) {
        const db = useSQLiteContext();
        const wordIsValid = db.getAllSync('SELECT * FROM Words WHERE word = ?', [theWord.toLowerCase()]);

        if(wordIsValid.length > 0) wordIsVal4 = true;
        else wordIsVal4 = false;
        return;
    }
}

let suggestedWords = [];
type WordToBeSearch = { 
    wordToSearch1: string; 
    wordToSearch2: string; 
    wordToSearch3: string; 
    wordToSearch4: string; 
}

function RetrieveHint( props: WordToBeSearch) {
    const theWord1 = props.wordToSearch1.join("");
    const theWord2 = props.wordToSearch2.join("");
    const theWord3 = props.wordToSearch3.join("");
    const theWord4 = props.wordToSearch4.join("");
    const db = useSQLiteContext();

    if(theWord1.length > 1) suggestedWords = db.getAllSync('SELECT * FROM Words WHERE word LIKE ? AND length(word) > 1 AND length(word) < 11 LIMIT 3;', [`${theWord1.toLowerCase()}%`]);
    if(theWord3.length > 1) suggestedWords = db.getAllSync('SELECT * FROM Words WHERE word LIKE ? AND length(word) > 1 AND length(word) < 11 LIMIT 3;', [`${theWord3.toLowerCase()}%`]);
    if(theWord4.length > 1) suggestedWords = db.getAllSync('SELECT * FROM Words WHERE word LIKE ? AND length(word) > 1 AND length(word) < 11 LIMIT 3;', [`${theWord4.toLowerCase()}%`]);
    if(theWord2.length > 1) suggestedWords = db.getAllSync('SELECT * FROM Words WHERE word LIKE ? AND length(word) > 1 AND length(word) < 11 LIMIT 3;', [`${theWord2.toLowerCase()}%`]);
    return;
}

const NormalZen = ({ navigation }: RouterProps) => {
    const [nextLetters, setNextLetters] = useState([random_letter(), random_letter()]);
    const [wordHolder1, setWordHolder1] = useState([]);
    const [wordHolder2, setWordHolder2] = useState([]);
    const [wordHolder3, setWordHolder3] = useState([]);
    const [wordHolder4, setWordHolder4] = useState([]);
    const [score, setScore] = useState(0);

    // Update Next Playable Letter
    function updateNextLetters() {
        const getNewLetter = random_letter()
        setNextLetters([nextLetters[1], getNewLetter]);
    }

    // Player Made Their Moves
    function playerMove(currentLetters, newLetter) {
        // Move the letter into selected container
        let wordInHolder = currentLetters;
        wordInHolder.push(newLetter);
        updateNextLetters();
        return(wordInHolder);
    };

    // Update Holder
    function updateHolder1() {
        if(wordHolder1.length < maxChar) {
            setWordHolder1(playerMove(wordHolder1, nextLetters[0]));
            gameOver();
        }
        else if(wordHolder1.length > maxChar) Alert.alert("10 character limit, please choose another container");
    };
    function updateHolder2() {
        if(wordHolder2.length < maxChar) {
            setWordHolder2(playerMove(wordHolder2, nextLetters[0]));
            gameOver();
        }
        else if(wordHolder2.length > maxChar) Alert.alert("10 character limit, please choose another container");
    };
    function updateHolder3() {
        if(wordHolder3.length < maxChar) {
            setWordHolder3(playerMove(wordHolder3, nextLetters[0]));
            gameOver();
        }
        else if(wordHolder3.length > maxChar) Alert.alert("10 character limit, please choose another container");
    };
    function updateHolder4() {
        if(wordHolder4.length < maxChar) {
            setWordHolder4(playerMove(wordHolder4, nextLetters[0]));
            gameOver();
        }
        else if(wordHolder4.length > maxChar) Alert.alert("10 character limit, please choose another container");
    };

    // Submit Word that is of 2 to 10 letters
    function submitHolder1() {
        if(wordHolder1.length < minChar) Alert.alert("Minimum 2 characters")
        else if(wordHolder1.length > 1) {
            if(wordIsVal1 == true) {
                setWordHolder1([]);
                setScore(score + 1);
                wordIsVal1 = false;
                suggestedWords = [];
            }
            else Alert.alert("Invalid Word");
        }
    }

    function submitHolder2() {
        if(wordHolder2.length < minChar) Alert.alert("Minimum 2 characters")
        else if(wordHolder2.length > 1) {
            if(wordIsVal2 == true) {
                setWordHolder2([]);
                setScore(score + 1);
                wordIsVal2 = false;
                suggestedWords = [];
            }
            else Alert.alert("Invalid Word");
        }
    }

    function submitHolder3() {
        if(wordHolder3.length < minChar) Alert.alert("Minimum 2 characters")
        else if(wordHolder3.length > 1 && wordHolder3.length < 11) {
            if(wordIsVal3 == true) {
                setWordHolder3([]);
                setScore(score + 1);
                wordIsVal3 = false;
                suggestedWords = [];
            }
            else Alert.alert("Invalid Word");
        }
    }

    function submitHolder4() {
        if(wordHolder4.length < minChar) Alert.alert("Minimum 2 characters")
        else if(wordHolder4.length > 1) {
            if(wordIsVal4 == true) {
                setWordHolder4([]);
                setScore(score + 1);
                wordIsVal4 = false;
                suggestedWords = [];
            }
            else Alert.alert("Invalid Word");
        }
    }

    // Empty Container
    function emptyContainer1() {
        if(wordHolder1.length == 0) Alert.alert("Container is already empty!");
        else if(wordHolder1.length > 0) setWordHolder1([]);
    }

    function emptyContainer2() {
        if(wordHolder2.length == 0) Alert.alert("Container is already empty!");
        else if(wordHolder2.length > 0) setWordHolder2([]);
    }

    function emptyContainer3() {
        if(wordHolder3.length == 0) Alert.alert("Container is already empty!");
        else if(wordHolder3.length > 0) setWordHolder3([]); 
    }

    function emptyContainer4() {
        if(wordHolder4.length == 0) Alert.alert("Container is already empty!");
        else if(wordHolder4.length > 0) setWordHolder4([]); 
    }

    // Show Hints
    function showHints() {
        if(suggestedWords.length > 1) {
            let words = [];
            for(let word of suggestedWords) words.push(" " + word.word.toUpperCase());
            suggestedWords = [];
            Alert.alert("Hints: ", words.toString())
        }
        else if(wordHolder1.length < minChar || wordHolder2.length < minChar || wordHolder3.length < minChar || wordHolder4.length < minChar){
            Alert.alert("No possible words can be formed at the moment, but you still have a container. Try filling it to create a valid word!");
        }
        else {
            Alert.alert("No possible words can be formed with the current selections. Try clearing a container.");
        }

    }

    // Gameover Checker
    function gameOver() {
        if(wordHolder1.length > maxChar && wordHolder2.length > maxChar && wordHolder3.length > maxChar && wordHolder4.length > maxChar)
        Alert.alert("Game Over! No more valid moves remaining");
    }

    // Exit Game
    function exitGame() {
        Alert.alert("Exit Game?", "Are you sure you want to exit? \n" + "Current Score: " + score, [
            {
                text: 'Continue Playing',
                style: 'cancel'
            },
            {
                text: 'Exit',
                onPress: () => {
                    navigation.goBack();
                    updateHighScore(globalUserId, 0, 0, score);
                }
            }
        ])
    }

    return (
        <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <SQLiteProvider databaseName="words.db" assetSource={{ assetId: require('../../../assets/words.db') }}>

            {/* Header Area */}
            <View style={styles.header_area}>
                <View style={styles.back_container}>
                <TouchableOpacity onPress={() => exitGame()}>
                    <MaterialCommunityIcons name="arrow-left" size={scale * 20} />
                </TouchableOpacity>
                </View>
                <View style={styles.game_mode_container}>
                    <Text style={styles.game_mode_title}>Zen Mode</Text>
                </View>
                <View style={styles.score_container}>
                    <Text style={styles.score}>Score: {score}</Text>
                </View>
            </View>

            {/* Next Letters Area */}
            <View style={styles.next_letters_area}> 
                <View style={styles.next_letter_container}>
                    <Text style={[styles.letters, styles.next_letter]}>{nextLetters[1]}</Text>
                </View>
                {/* Trash, Hints and Current Letter Container */}
                <View style={styles.current_letter_trash_hints_container}>
                    {/* Empty and Hints Container */}
                    <View style={styles.trash_hints_container}>
                        <View style={styles.trash_container}>
                            <View>
                                <MaterialCommunityIcons name="trash-can-outline" size={scale * 30} />
                            </View>
                            <View style={styles.number_of_trash_hints_container}> 
                                <MaterialCommunityIcons name="infinity" size={scale * 12} color={"white"} />
                            </View>
                        </View>
                        <View style={styles.hints_container}>
                            <TouchableOpacity style={styles.hints_button} onPress={showHints}>
                                <MaterialCommunityIcons name="lightbulb-on-outline" size={scale * 30} color={"#F5B600"} />
                            </TouchableOpacity>
                            <View style={styles.number_of_trash_hints_container}> 
                                <MaterialCommunityIcons name="infinity" size={scale * 12} color={"white"} />
                            </View>
                            <RetrieveHint wordToSearch1={wordHolder1} wordToSearch2={wordHolder2} wordToSearch3={wordHolder3} wordToSearch4={wordHolder4} />
                        </View>
                    </View>
                    {/* Current Letter */}
                    <View style={styles.current_letter_container}>
                        <Text style={[styles.letters, styles.current_letter]}>{nextLetters[0]}</Text>
                    </View>
                </View> 
            </View>

            {/* Playable Area */}
            <View style={styles.playable_area}>
                {/* Holder 1 & 2 */}
                <View>
                    <View style={styles.word_holder_container}>
                        <TouchableOpacity style={styles.word_holder} onPress={updateHolder1}>
                            <Text adjustsFontSizeToFit numberOfLines={1} style={[styles.letters, styles.playfield_letters]}>{wordHolder1}</Text>
                            <ValidateWord1 wordToBeVal={wordHolder1} />
                        </TouchableOpacity>
                        <View style={styles.trash_submit_container}>
                            <TouchableOpacity style={[styles.trash_submit_button, styles.trash_button]} onPress={emptyContainer1}>
                                <MaterialCommunityIcons name="trash-can-outline" size={scale * 20} color={'darkred'} />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.trash_submit_button, styles.submit_button]} onPress={submitHolder1}>
                                <MaterialCommunityIcons name="check" color="black" size={20 * scale} color={'darkgreen'} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.word_holder_container}>
                        <TouchableOpacity style={styles.word_holder} onPress={updateHolder2}>
                            <Text adjustsFontSizeToFit numberOfLines={1} style={[styles.letters, styles.playfield_letters]}>{wordHolder2}</Text>
                            <ValidateWord2 wordToBeVal={wordHolder2} />
                        </TouchableOpacity>
                        <View style={styles.trash_submit_container}>
                            <TouchableOpacity style={[styles.trash_submit_button, styles.trash_button]} onPress={emptyContainer2}>
                                <MaterialCommunityIcons name="trash-can-outline" size={scale * 20} color={'darkred'} />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.trash_submit_button, styles.submit_button]} onPress={submitHolder2}>
                                <MaterialCommunityIcons name="check" color="black" size={20 * scale} color={'darkgreen'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Holder 3 & 4 */}
                <View>
                    <View style={styles.word_holder_container}>
                        <TouchableOpacity style={styles.word_holder} onPress={updateHolder3}>
                            <Text adjustsFontSizeToFit numberOfLines={1} style={[styles.letters, styles.playfield_letters]}>{wordHolder3}</Text>
                            <ValidateWord3 wordToBeVal={wordHolder3} />
                        </TouchableOpacity>
                        <View style={styles.trash_submit_container}>
                            <TouchableOpacity style={[styles.trash_submit_button, styles.trash_button]} onPress={emptyContainer3}>
                                <MaterialCommunityIcons name="trash-can-outline" size={scale * 20} color={'darkred'} />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.trash_submit_button, styles.submit_button]} onPress={submitHolder3}>
                                <MaterialCommunityIcons name="check" color="black" size={20 * scale} color={'darkgreen'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.word_holder_container}>
                        <TouchableOpacity style={styles.word_holder} onPress={updateHolder4}>
                            <Text adjustsFontSizeToFit numberOfLines={1} style={[styles.letters, styles.playfield_letters]}>{wordHolder4}</Text>
                            <ValidateWord4 wordToBeVal={wordHolder4} />
                        </TouchableOpacity>
                        <View style={styles.trash_submit_container}>
                            <TouchableOpacity style={[styles.trash_submit_button, styles.trash_button]} onPress={emptyContainer4}>
                                <MaterialCommunityIcons name="trash-can-outline" size={scale * 20} color={'darkred'} />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.trash_submit_button, styles.submit_button]} onPress={submitHolder4}>
                                <MaterialCommunityIcons name="check" color="black" size={20 * scale} color={'darkgreen'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            </SQLiteProvider>
        </SafeAreaView>
    );
}

export default NormalZen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },

    header_area: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    
    back_container: {
        flex: 1,
        justifyContent: 'center',
    },

    game_mode_container: {
        flex: 2,
        alignItems: 'center'
    },
    
    game_mode_title: {
        fontSize: scale * 20,
        fontWeight: 'bold'
    },
    
    score_container: {
        flex: 1,
        width: '30%',
    },

    score: {
        fontSize: scale * 16,
    },

    next_letters_area: {
        flex: 6,
        alignItems: 'center',
    },

    next_letter_container: {
        flex: 1,
        alignSelf: 'flex-end',
        justifyContent: 'center',
    },

    next_letter: {
        backgroundColor: 'linen',
        borderWidth: 1,
        width: width / 6,
        height: width / 6,
        fontSize: scale * 20,
    },

    current_letter_trash_hints_container: {
        flexDirection: "row",
    },

    current_letter_container: {
        flex: 3,
        justifyContent: 'center'
    },

    current_letter: {
        backgroundColor: 'linen',
        borderWidth: 1,
        width: width / 1.75,
        height: width / 1.75,
        fontSize: scale * 80,
    },

    trash_hints_container: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'center',
    },
    
    trash_container: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'center',
        padding: scale * 2,
    },

    number_of_trash_hints_container: {
        position: 'absolute',
        top: -20,
        right: -20,
        borderColor: 'darkslategreen',
        backgroundColor: "green",
        borderRadius: 100,
        borderWidth: 2,
        height: scale * 25,
        width: scale * 25,
        justifyContent: 'center',
        alignItems: 'center'
    },

    hints_container: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'center',
    },
    
    hints_button: {
        backgroundColor: '#FFF5D9',
        borderColor: '#F5B600',
        borderWidth: 1,
        padding: scale * 2,
    },

    playable_area: {
        flex: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    word_holder_container: {
        flex: 1,
        padding: scale * 10,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    
    word_holder: {
        backgroundColor: 'linen',
        borderWidth: 1,
        width: width * 0.4,
        height: width * 0.175,
        justifyContent: 'center',
    },

    playfield_letters: {
        fontSize: scale * 40,
    },

    trash_submit_container: {
        flexDirection: 'row'
    },
    
    trash_submit_button: {
        backgroundColor: 'lightgrey',
        borderWidth: 1,
        padding: scale * 2,
        marginHorizontal: scale * 15,
    },

    trash_button: {
        backgroundColor: '#FFE1E1',
        borderColor: 'darkred',
    },

    submit_button: {
        backgroundColor: '#E1FFE1',
        borderColor: 'darkgreen',
    },

    letters: {
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
    }
});
