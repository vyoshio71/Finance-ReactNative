import {
  View,
  StyleSheet,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import axios from "axios";
import React, { useState } from "react";

import Header from "../../components/Navibar";

const SERVER_URL = "http://{YOUR IP ADDRESS}:3000";

export default function AddTransaction({ navigation }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Entrada" || "Saida");
  const [date, setDate] = useState();

  const [validationErrors, setValidationErrors] = useState({});

  const validateFields = () => {
    const errors = {};

    if (!title) {
      errors.title = "Title is required";
    }

    if (!amount) {
      errors.amount = "Amount is required";
    }

    if (!type) {
      errors.type = "Type is required";
    }

    if (!date) {
      errors.date = "Date is required";
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleAddTransaction = () => {
    if (validateFields()) {
      const newTransaction = {
        title,
        value: parseFloat(value),
        date,
        type,
      };

      axios
        .post(`${SERVER_URL}/transactions`, newTransaction)
        .then((response) => {
          console.log("Transaction added:", response.data);
          navigation.goBack();
        })
        .catch((error) => {
          console.error("Error adding transaction:", error);
        });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Header />

        <View style={styles.inputContainer}>
          <View style={styles.inputTitle}>
            <Text style={styles.textColor}>Título</Text>
            <TextInput
              style={styles.inputStyleDate}
              value={title}
              onChangeText={setTitle}
            />
            {validationErrors.title && (
              <Text style={styles.errorText}>{validationErrors.title}</Text>
            )}
          </View>

          <View style={styles.inputValue}>
            <Text style={styles.textColor}>Valor</Text>
            <TextInput
              style={styles.inputStyleDate}
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />
            {validationErrors.amount && (
              <Text style={styles.errorText}>{validationErrors.amount}</Text>
            )}
          </View>
        </View>

        <View style={styles.radioContainer}>
          <View style={styles.radioStyle}>
            <TouchableOpacity
              style={
                type === "Entrada" ? styles.radioChecked : styles.radioUnchecked
              }
              onPress={() => setType("Entrada")}
            ></TouchableOpacity>
            <Text style={styles.textColorCheckBox}>Entrada</Text>
          </View>

          <View style={styles.radioStyle}>
            <TouchableOpacity
              style={
                type === "Saída" ? styles.radioChecked : styles.radioUnchecked
              }
              onPress={() => setType("Saída")}
            ></TouchableOpacity>
            <Text style={styles.textColorCheckBox}>Saída</Text>
          </View>
        </View>

        <View style={styles.inputContainerDate}>
          <View>
            <Text style={styles.textColorDate}>Data</Text>
            <TextInput
              style={styles.inputStyleDate}
              value={date}
              onChangeText={setDate}
            />
            {validationErrors.date && (
              <Text style={styles.errorText}>{validationErrors.date}</Text>
            )}
          </View>
        </View>

        <View style={styles.buttonStyle}>
          <Button
            title="Criar Transação"
            color="#fff"
            onPress={handleAddTransaction}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2D2D2D",
    minHeight: "100%",
  },

  buttonStyle: {
    position: "absolute",
    marginTop: 530,
    backgroundColor: "#0C70F2",
    width: 284,
    height: 37,
    borderRadius: 5,
    marginLeft: 45,
  },

  textColor: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
    justifyContent: "flex-start",
    marginBottom: 4,
  },

  inputStyle: {
    borderRadius: 5,
    backgroundColor: "#fff",
    width: 264,
    height: 34,
    marginBottom: 13,
  },

  inputContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
    paddingVertical: 5,
  },

  textColorDate: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
    justifyContent: "flex-start",
    marginBottom: 4,
  },

  inputStyleDate: {
    borderRadius: 5,
    backgroundColor: "#fff",
    width: 264,
    height: 34,
  },

  textColorCheckBox: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
    justifyContent: "flex-start",
    paddingLeft: 8,
  },

  radioContainer: {
    flexDirection: "column",
    marginTop: 10,
    marginLeft: 55,
  },

  radioChecked: {
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "white",
    borderRadius: 100,
    padding: 10,
  },

  radioUnchecked: {
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "transparent",
    borderRadius: 100,
    padding: 10,
  },

  radioStyle: {
    flexDirection: "row",
    paddingVertical: 5,
    alignItems: "center",
  },

  inputTitle: {
    marginTop: 100,
  },

  inputValue: {
    marginTop: 10,
  },

  inputContainerDate: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
  },

  errorText: {
    color: "red",
    fontSize: 12,
  },
});
