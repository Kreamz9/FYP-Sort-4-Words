import { doc, getDoc, setDoc } from "firebase/firestore"
import { FIREBASE_DB } from "../../FirebaseConfig";
import { useState, useEffect } from 'react';

// Import API Key
import { apiKey } from '../../App'
export let globalWordsOfTheDay = [];

// Updating of Scores
const updateHighScore = async (userId: string, ne: number, nh: number, nz: number) => {
    if(!userId) return;

    let currNormalEasy = ne;
    let currNormalHard = nh;
    let currNormalZen = nz;

    const docRef = doc(FIREBASE_DB, `highscore/${userId}`);
    const docSnap = await getDoc(docRef);

    let newScore = {
        normalEasy: 0,
        normalHard: 0,
        normalZen: 0
    }

    if (docSnap.exists()) {
        const data = docSnap.data();

        const savedNormalEasy = data.normalEasy;
        const savedNormalHard = data.normalHard;
        const savedNormalZen = data.normalZen;

        if(savedNormalEasy > currNormalEasy) currNormalEasy = savedNormalEasy;
        if(savedNormalHard > currNormalHard) currNormalHard = savedNormalHard;
        if(savedNormalZen > currNormalZen) currNormalZen = savedNormalZen;
        newScore = {
            normalEasy: currNormalEasy,
            normalHard: currNormalHard,
            normalZen: currNormalZen
        }
    }
    else {
        const savedNormalEasy = 0;
        const savedNormalHard = 0;
        const savedNormalZen = 0;

        if(savedNormalEasy > currNormalEasy) currNormalEasy = savedNormalEasy;
        if(savedNormalHard > currNormalHard) currNormalHard = savedNormalHard;
        if(savedNormalZen > currNormalZen) currNormalZen = savedNormalZen;
        newScore = {
            normalEasy: currNormalEasy,
            normalHard: currNormalHard,
            normalZen: currNormalZen
        }
    }

    await setDoc(docRef, newScore);
}

// Get Words of the Day
const getWordsOfTheDay = async () => {
    const [wordsList, setWordsList] = useState([]);
    
    // Get Random Words
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=10&limit=15&api_key=${apiKey}`); 
                if (!response.ok){
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                // Filter words to ensure they contain only letters (no spaces or symbols)
                const filteredWords = data.filter(item => /^[A-Za-z]+$/.test(item.word));

                let tempWordListHolder = []
                for(let i in filteredWords){
                    if(i < 10) tempWordListHolder.push(filteredWords[i].word);
                }
                setWordsList(tempWordListHolder);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const getDate = new Date();
    const currDate = getDate.getUTCFullYear().toString() + "." + getDate.getUTCMonth().toString() + "." + getDate.getUTCDate().toString();
    
    const docRef = doc(FIREBASE_DB, `wordsOfTheDay/${currDate}`);
    const docSnap = await getDoc(docRef);

    let newWords = {
        words: [""]
    }

    // If Words existed for today, return none
    if (docSnap.exists()) return;
    // If Words not existed for today, to create a new document
    else {
        newWords = {
            words: wordsList,
        }
        await setDoc(docRef, newWords);
    }
}

// Get Definitions of Words of the Day
const getWordsDefinitions = async (theWordToDefine: string) => {
    const [wordsData, setWordsData] = useState([]);

    // Get Word Data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.wordnik.com/v4/word.json/${theWordToDefine.toString()}/definitions?limit=5&includeRelated=false&useCanonical=false&includeTags=false&api_key=${apiKey}`); 
                if (!response.ok){
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    // Update data in Firestore
}

// Retrieve Words of the Day
const retrieveWordsOfTheDay = async () => {

    const getDate = new Date();
    const currDate = getDate.getUTCFullYear().toString() + "." + getDate.getUTCMonth().toString() + "." + getDate.getUTCDate().toString();
    
    const docRef = doc(FIREBASE_DB, `wordsOfTheDay/${currDate}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data();
        globalWordsOfTheDay = data.words;
    }
}

export { updateHighScore, getWordsOfTheDay, retrieveWordsOfTheDay, getWordsDefinitions };