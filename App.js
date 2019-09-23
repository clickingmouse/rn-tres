import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  const configureNewGameHandler = () => {
    //setGuessRounds(0);
    //setUserNumber(null);
  };

  const startGameHandler = selectedNumber => {
    console.log("start", selectedNumber);
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  const GameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  };
  console.log(userNumber);
  console.log(guessRounds);
  console.log(".");
  let content = <StartGameScreen onStartGame={startGameHandler} />;
  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={GameOverHandler} />
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onRestart={configureNewGameHandler}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
    //justifyContent: "center"
  },
  container: {
    flex: 1
  }
});
