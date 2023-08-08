import {
  View,
  StyleSheet,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "../../components/Navibar";

const SERVER_URL = "http://{YOUR IP ADDRESS}:3000";

export default function EditTransactionScreen({ route, navigation }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");

  const { id } = route.params;

  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/transactions/${id}`)
      .then((response) => {
        const transaction = response.data;
        setTitle(transaction.title);
        setAmount(transaction.amount.toString());
        setType(transaction.type);
        setDate(transaction.date);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleUpdate = () => {
    axios
      .put(`${SERVER_URL}/transactions/${id}`, {
        title,
        amount: parseFloat(amount),
        type,
        date,
      })
      .then((response) => {
        console.log("Transaction updated:", response.data);
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = () => {
    setIsModalVisible(true);
  };

  const confirmDelete = async () => {
    axios
      .delete(`${SERVER_URL}/transactions/${id}`)
      .then(() => {
        console.log("Transaction deleted");
        setIsModalVisible(false);
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const cancelDelete = () => {
    setIsModalVisible(false);
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
          </View>

          <View style={styles.inputValue}>
            <Text style={styles.textColor}>Valor</Text>
            <TextInput
              style={styles.inputStyleDate}
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />
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
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            style={styles.buttonStyle}
            title="Atualizar Transação"
            color="#fff"
            onPress={handleUpdate}
          />
          <View style={styles.buttonContainerDelete}>
            <Button
              style={styles.buttonStyle}
              title="Deletar Transação"
              color="#fff"
              onPress={handleDelete}
            />

            <Modal
              animationType="slide"
              transparent={true}
              visible={isModalVisible}
              onRequestClose={() => setIsModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>
                    Você deseja excluir esta transação?
                  </Text>
                  <View style={styles.modalButtonContent}>
                    <TouchableOpacity
                      style={styles.yesButton}
                      onPress={confirmDelete}
                    >
                      <Text style={styles.buttonText}>Sim</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.noButton}
                      onPress={cancelDelete}
                    >
                      <Text style={styles.buttonText}>Não</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
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
  },

  buttonContainer: {
    flexDirection: "column",
    backgroundColor: "#0C70F2",
    width: 284,
    height: 37,
    borderRadius: 5,
    marginLeft: 45,
    marginTop: 50,
  },

  buttonContainerDelete: {
    backgroundColor: "#0C70F2",
    width: 284,
    height: 37,
    borderRadius: 5,
    marginTop: 20,
  },

  textColor: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
    justifyContent: "flex-start",
    marginBottom: 4,
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
    fontWeight: "500",
    fontSize: 15,
    paddingLeft: 10,
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

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(217, 217, 217, 0.5)",
  },

  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 320,
    height: 230,
  },

  modalTitle: {
    paddingTop: 30,
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },

  modalButtonContent: {
    paddingTop: 40,
    flexDirection: "row",
    justifyContent: "space-evenly",
    textAlign: "center",
  },

  yesButton: {
    width: 82,
    height: 52,
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: 1,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },

  noButton: {
    width: 82,
    height: 52,
    borderRadius: 10,
    backgroundColor: "#0C70F2",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
