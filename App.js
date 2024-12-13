import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';

const { width } = Dimensions.get('window'); 
const scale = width / 320;

// Random Letter Generator
function random_letter() {
  const getRandomNumber = Math.floor(Math.random() * 26);
  // Note: ASCII Values for Capital Letter Ranges from 65 to 90
  const numToLetter = String.fromCharCode(getRandomNumber + 65);
  return numToLetter;
}

export default function App() {
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

  function updateHolder1() {setWordHolder1(playerMove(wordHolder1, nextLetters[0]))};
  function updateHolder2() {setWordHolder2(playerMove(wordHolder2, nextLetters[0]))};
  function updateHolder3() {setWordHolder3(playerMove(wordHolder3, nextLetters[0]))};
  function updateHolder4() {setWordHolder4(playerMove(wordHolder4, nextLetters[0]))};

  // Submit Word
  function validateWord() {
    // Word is Valid
    setScore(score + 1);


    // Word is Not Valid
  }

  function submitHolder1() {
    validateWord();
    setWordHolder1([]);
  }

  function submitHolder2() {
    validateWord();
    setWordHolder2([]);
  }

  function submitHolder3() {
    validateWord();
    setWordHolder3([]);
  }

  function submitHolder4() {
    validateWord();
    setWordHolder4([]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Header Area */}
      <View style={styles.header_area}>
        <View style={styles.score_container}>
          <Text style={styles.score}>Score: {score}</Text>
        </View>
      </View>

      {/* Next Letters Area */}
      <View style={styles.next_letters_area}> 
        <View style={styles.next_letter_container}>
          <Text style={[styles.letters, styles.next_letter]}>{nextLetters[1]}</Text>
        </View>
        <View style={styles.current_letter_container}>
          <Text style={[styles.letters, styles.current_letter]}>{nextLetters[0]}</Text>
        </View> 
      </View>

      {/* Playable Area */}
      <View style={styles.playable_area}>
        {/* Holder 1 & 2 */}
        <View>
          <View style={styles.word_holder_container}>
            <TouchableOpacity style={styles.word_holder} onPress={updateHolder1}>
              <Text adjustsFontSizeToFit numberOfLines={1} style={[styles.letters, styles.playfield_letters]}>{wordHolder1}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submit_button} onPress={submitHolder1}>
              <MaterialCommunityIcons name="check" color="black" size={20 * scale} />
            </TouchableOpacity>
          </View>

          <View style={styles.word_holder_container}>
            <TouchableOpacity style={styles.word_holder} onPress={updateHolder2}>
              <Text adjustsFontSizeToFit numberOfLines={1} style={[styles.letters, styles.playfield_letters]}>{wordHolder2}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submit_button} onPress={submitHolder2}>
              <MaterialCommunityIcons name="check" color="black" size={20 * scale} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Holder 3 & 4 */}
        <View>
          <View style={styles.word_holder_container}>
            <TouchableOpacity style={styles.word_holder} onPress={updateHolder3}>
              <Text adjustsFontSizeToFit numberOfLines={1} style={[styles.letters, styles.playfield_letters]}>{wordHolder3}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submit_button} onPress={submitHolder3}>
              <MaterialCommunityIcons name="check" color="black" size={20 * scale} />
            </TouchableOpacity>
          </View>
          <View style={styles.word_holder_container}>
            <TouchableOpacity style={styles.word_holder} onPress={updateHolder4}>
              <Text adjustsFontSizeToFit numberOfLines={1} style={[styles.letters, styles.playfield_letters]}>{wordHolder4}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submit_button} onPress={submitHolder4}>
              <MaterialCommunityIcons name="check" color="black" size={20 * scale} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

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
  
  score_container: {
    alignSelf: 'flex-end',
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

  current_letter_container: {
    flex: 2,
    justifyContent: 'center'
  },

  current_letter: {
    backgroundColor: 'linen',
    borderWidth: 1,
    width: width / 1.75,
    height: width / 1.75,
    fontSize: scale * 80,
  },

  playable_area: {
    flex: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  word_holder_container: {
    flex: 1,
    backgroundColor: 'white',
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
    // adjustsFontSizeToFit: true,
    // numberOfLines: 1,
  },

  submit_button: {
    backgroundColor: 'lightgrey',
    borderWidth: 1,
    padding: scale * 2,
  },

  letters: {
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  }
});
