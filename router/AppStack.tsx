import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Button } from "react-native";
import useAuth from "../hooks/useAuth";
import HomePage from "../pages/HomePage";
import LogoutButton from "../components/LogoutButton";

const Stack = createNativeStackNavigator();
function AppStack() {
  const { logout } = useAuth();
  return (
    <Stack.Navigator screenOptions={{headerRight: () => <LogoutButton logoutHandler={logout}/>
    }}>
      <Stack.Screen
        name="Home"
        component={HomePage}
      />
    </Stack.Navigator>
  );
}

export default AppStack;
