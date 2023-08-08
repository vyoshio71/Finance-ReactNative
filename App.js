import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import AddTransaction from "./src/screens/AddTransactionScreen";
import EditTransaction from "./src/screens/EditTransactionScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Transações Financeiras" }}
        />
        <Stack.Screen
          name="AddTransaction"
          component={AddTransaction}
          options={{ title: "Adicionar Transação" }}
        />
        <Stack.Screen
          name="EditTransactionScreen"
          component={EditTransaction}
          options={{ title: "Editar Transação" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
