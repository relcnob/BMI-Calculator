import { StatusBar } from "expo-status-bar";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import { useState } from "react";

export default function App() {
  const [error, setError] = useState(false);
  const [bmi, setBmi] = useState<number>();
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [isHeightFocused, setIsHeightFocused] = useState(false);
  const [isWeightFocused, setIsWeightFocused] = useState(false);

  const setter = {
    weight: (text) => {
      const numericValue = text.replace(/[^0-9]/g, "");
      setWeight(numericValue);
    },
    height: (text) => {
      const numericValue = text.replace(/[^0-9]/g, "");
      setHeight(numericValue);
    },
  };

  const calculateBMI = () => {
    setBmi(undefined);
    const weightValue = parseInt(weight);
    const heightValue = parseInt(height);
    if (parseInt(height) > 0 && parseInt(weight) > 0) {
      const bmi = (weightValue / ((heightValue * heightValue) / 10000)).toFixed(
        2
      );
      setBmi(parseFloat(bmi));
    } else {
      setError(true);
    }
  };

  return (
    <ScrollView
      style={styles.wrapper}
      keyboardShouldPersistTaps="handled"
      scrollEnabled={false}
      contentContainerStyle={{ minHeight: "100%" }}
    >
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Pressable>
          <Image source={require("./assets/bin.svg")}></Image>
        </Pressable>
        <Text style={styles.header}>BMI Calculator</Text>
        <Text style={styles.description}>
          Type your details below and get an accurate BMI number.
        </Text>
        <Text style={styles.inputLabel}>Height</Text>
        <TextInput
          style={[
            styles.input,
            isHeightFocused ? styles.focused : styles.unfocused,
          ]}
          onChangeText={setter.height}
          value={height}
          keyboardType="numeric"
          placeholder="Your height"
          onFocus={() => {
            setIsHeightFocused(true);
            setError(false);
          }}
          onBlur={() => setIsHeightFocused(false)}
        />
        <Text style={styles.inputLabel}>Weight</Text>
        <TextInput
          style={[
            styles.input,
            isWeightFocused ? styles.focused : styles.unfocused,
          ]}
          onChangeText={setter.weight}
          value={weight}
          keyboardType="numeric"
          placeholder="Your weight"
          onFocus={() => {
            setIsWeightFocused(true);
            setError(false);
          }}
          onBlur={() => setIsWeightFocused(false)}
        />
        {error && (
          <Text style={styles.textError}>
            Both fields have to be filled out
          </Text>
        )}
        <View>
          <Pressable style={styles.button} onPress={calculateBMI}>
            <Text style={styles.buttonText}>Calculate BMI</Text>
          </Pressable>
          {/* <Button title="Calculate BMI" onPress={calculateBMI} /> */}
        </View>
      </View>
      {bmi && (
        <View
          style={[
            styles.output,
            (bmi > 24.9 && bmi) || (bmi < 18.6 && bmi)
              ? styles.backgroundRed
              : bmi < 24.9 && bmi > 18.6
              ? styles.backgroundGreen
              : styles.backgroundWhite,
          ]}
        >
          {bmi && bmi > 0 && (
            <Text style={styles.outputText}>Your BMI: {bmi} </Text>
          )}
          {bmi > 0 && bmi < 18.6 && (
            <Text style={styles.outputText}>Weight: Underweight</Text>
          )}
          {bmi >= 18.6 && bmi < 24.9 && (
            <Text style={styles.outputText}>Weight: Normal</Text>
          )}
          {bmi > 24.9 && (
            <Text style={styles.outputText}>Weight: Overweight</Text>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: "100%",
    minHeight: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff1f1",
    alignItems: "center",
    justifyContent: "center",
  },
  output: {
    flex: 1,
    backgroundColor: "#fff1f1",
    alignItems: "center",
    justifyContent: "center",
  },
  outputText: {
    fontSize: 24,
    fontWeight: "500",
    letterSpacing: 1.1,
  },
  description: {
    fontSize: 16,
    color: "#676754",
    maxWidth: 250,
    textAlign: "center",
    marginBottom: 32,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: "#a1a1a1",
    padding: 10,
    width: 250,
    borderRadius: 4,
    backgroundColor: "#fff1f1",
    fontSize: 16,
  },
  focused: {
    borderColor: "#1f1f1f",
  },
  unfocused: {},
  inputLabel: {
    width: 250,
    fontSize: 18,
    fontWeight: "600",
    color: "#37393d",
  },
  textError: {
    width: 250,
    fontSize: 14,
    fontWeight: "400",
    color: "#ff2222",
  },
  header: {
    fontSize: 24,
    fontWeight: "600",
    color: "#37393d",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#06d183",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 48,
    borderRadius: 4,
    elevation: 3,
    marginTop: 20,
    width: 250,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.25,
  },
  backgroundRed: {
    backgroundColor: "#ffaaaa",
  },
  backgroundGreen: {
    backgroundColor: "#aaffaa",
  },
  backgroundWhite: {
    backgroundColor: "#fff1f1",
  },
});
