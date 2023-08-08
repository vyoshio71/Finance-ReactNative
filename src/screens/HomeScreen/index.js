import React, { useEffect, useState } from "react";
import axios from "axios";
import { StyleSheet, View, Text, Button, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { FontAwesome5 } from "react-native-vector-icons";
import { Feather } from "react-native-vector-icons";

import Header from "../../components/Navibar/index";

const SERVER_URL = "http://{YOUR IP ADDRESS}:3000";

export default function HomeScreen({ navigation }) {
  const [transactions, setTransactions] = useState([]);

  const calculateTotalAmount = (type) => {
    return transactions.reduce((total, transaction) => {
      if (transaction.type === type) {
        return total + transaction.amount;
      }
      return total;
    }, 0);
  };

  const totalIncome = calculateTotalAmount("Entrada");
  const totalExpense = calculateTotalAmount("Saída");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/transactions`);
      setTransactions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.tableItemStyle}>
      <Text style={styles.tableItemsColor}>{item.title}</Text>
      <Text style={styles.tableItemsColor}>
        {item.type === "income" ? "R$ " : " R$ "}
        {item.amount.toFixed(2)}
      </Text>
      <Text style={styles.tableItemsColor}>{item.date}</Text>
      <View style={styles.icons}>
        <FontAwesome5
          name="edit"
          size={15}
          color="#fff"
          onPress={() =>
            navigation.navigate("EditTransactionScreen", { id: item.id })
          }
        />
      </View>
    </View>
  );

  const handleAddTransaction = () => {
    navigation.navigate("AddTransaction");
  };

  return (
    <View style={styles.containerHome}>
      <Header />

      <View style={styles.balanceContainer}>
        <View style={styles.balanceContent}>
          <Text style={styles.balanceText}>Entradas</Text>
          <Text style={styles.balanceValueText}>
            R$ {totalIncome.toFixed(2)}
          </Text>
        </View>
        <View style={styles.balanceContent}>
          <Text style={styles.balanceText}>Saídas</Text>
          <Text style={styles.balanceValueText}>
            R$ {totalExpense.toFixed(2)}
          </Text>
        </View>
      </View>

      <View style={styles.tableHeader}>
        <View style={styles.tableHeaderContent}>
          <View style={styles.tableTitles}>
            <Text style={styles.columnHeader}>Transação</Text>
            <Text style={styles.columnHeader}>Valor</Text>
            <Text style={styles.columnHeader}>Data</Text>
            <Feather name="list" size={15} color="#fff" />
          </View>

          <View style={styles.divisorContainer}>
            <Text style={styles.divisor}>----------------</Text>
          </View>

          <View style={styles.tableItemsContent}>
            <FlatList
              style={styles.list}
              data={transactions}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </View>
      </View>

      <View style={styles.buttonHome}>
        <Button
          title="Adicionar Transação"
          color="#fff"
          onPress={handleAddTransaction}
        />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  containerHome: {
    backgroundColor: "#2D2D2D",
    minHeight: "100%",
  },

  buttonHome: {
    position: "absolute",
    marginTop: 530,
    backgroundColor: "#0C70F2",
    width: 284,
    height: 37,
    borderRadius: 5,
    marginLeft: 45,
  },

  tableHeader: {
    justifyContent: "center",
  },

  tableHeaderContent: {
    flexDirection: "column",
    justifyContent: "space-around",
    marginTop: 65,
    paddingHorizontal: 10,
  },

  columnHeader: {
    flexDirection: "column",
    justifyContent: "space-around",
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
  },

  divisorContainer: {
    alignItems: "center",
    marginTop: 12,
  },

  divisor: {
    width: 294,
    height: 4,
    backgroundColor: "#D9D9D9",
  },

  balanceContainer: {
    maxWidt: 323,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  balanceContent: {
    backgroundColor: "#F5F5F5",
    width: 140,
    height: 100,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
  },

  balanceText: {
    color: "#0C70F2",
    fontSize: 15,
    fontWeight: "700",
  },

  balanceValueText: {
    color: "#000",
    fontSize: 15,
    fontWeight: "600",
    paddingTop: 14,
  },

  tableItemStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 7,
    paddingHorizontal: 25,
    paddingTop: 10,
    alignItems: "center",
  },

  tableItemsColor: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
  },

  tableTitles: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  tableItemsContent: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  list: {},
});
