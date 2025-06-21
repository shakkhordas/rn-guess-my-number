import { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Ionicons } from '@expo/vector-icons';

import NumberContainer from "../components/game/NumberContainer";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstrctionText";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";

function generateRandomBetween(min, max, exclude) {
    const randNum = Math.floor(Math.random() * (max - min)) + min;

    if (randNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return randNum;
    }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ pickedUserNumber, onGameOver }) {
    const initialGuess = generateRandomBetween(1, 100, pickedUserNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);

    useEffect(() => {
        if (currentGuess === pickedUserNumber) {
            onGameOver();
        }
    }, [currentGuess, pickedUserNumber, onGameOver]);

    function nextGuessHandler(direction) {

        if ( (direction === 'lower' && currentGuess < pickedUserNumber) || (direction === 'greater' && currentGuess > pickedUserNumber) ) {
            Alert.alert(
                "Don't lie! You know this is wrong ...",
                "Do the right thing!",
                [
                    {
                        text: 'Sorry',
                        style: 'cancel'
                    }
                ]
            );
            return;
        }
        
        if (direction === 'lower') {
            maxBoundary = currentGuess;
        } else {
            minBoundary = currentGuess + 1;
        }
        
        const newRandNuumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
        
        setCurrentGuess(newRandNuumber);

    }

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{ currentGuess }</NumberContainer>
            <Card>
                <InstructionText style={styles.instructionText}>Higher or Lower?</InstructionText>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}> 
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                            <Ionicons name="remove" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                            <Ionicons name="add" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                </View>            
            </Card>
            {/* <View>LOG ROUNDS</View> */}
        </View>
    );
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24
    },
    instructionText: {
        marginBottom: 12
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    buttonContainer: {
        flex: 1
    }
});