import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  DismissKeyboard,
  Alert
} from "react-native";
import { paddedString } from "uuid-js";
import Card from "../components/Cards";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import Colors from "../constants/colors";
//
//
//
//

export default function StartGameScreen(props) {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    console.log("confirm handler", chosenNumber);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Invalid number!", "number has to be between 1 & 99.", [
        { text: "okay", style: "destructive", onPress: resetInputHandler }
      ]);
      return;
    }
    setConfirmed(true);

    //setSelectedNumber(parseInt(chosenNumber));
    setSelectedNumber(chosenNumber);
    setEnteredValue("");

    Keyboard.dismiss();
    console.log("->", selectedNumber);
    console.log("=>", enteredValue);
  };

  let confirmedOutput;
  console.log("confirmed", confirmed);
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.SummaryContainer}>
        <Text>You Selected: </Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <Button
          title="START GAME"
          onPress={() => {
            props.onStartGame(selectedNumber);
          }}
        />
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View styles={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>

        <Card style={styles.inputContainer}>
          <Text>Select a Number</Text>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="numeric"
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue}
          />

          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                color={Colors.accent}
                title="reset"
                onPress={resetInputHandler}
              />
            </View>
            <View style={styles.button}>
              <Button
                color={Colors.primary}
                title="confirm"
                onPress={confirmInputHandler}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"

    //width: "100%"
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    alignSelf: "center"
  },

  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center"
    // shadowColor: "black",
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 6,
    // shadowOpacity: 0.26,
    // backgroundColor: "white",
    // elevation: 5,
    // padding: 20,
    // borderRadius: 10
  },

  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between"
    //paddingHorizontal: 15
  },
  button: {
    width: 100
  },
  input: {
    width: 50,
    textAlign: "center"
  },
  SummaryContainer: {
    marginTop: 20,
    alignItems: "center"
  }
});
