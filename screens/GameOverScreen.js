import { StyleSheet, Text } from "react-native";

function GameOverScreen () {
    return (
        <Text style={styles.gameOverText}>Game is over!</Text>
    );
    
}

export default GameOverScreen;

const styles = StyleSheet.create({
    gameOverText: {
        flex: 1,
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    }
});