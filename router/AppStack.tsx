import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import DiningRoomScreen from "../pages/DiningRoomScreen";

const Stack = createNativeStackNavigator();
function AppStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" component={HomePage} />
      {/* <Stack.Screen name="Login" component={LoginPage} /> */}
      <Stack.Screen name="DiningRoom" component={DiningRoomScreen}/>
    </Stack.Navigator>
  );
}

export default AppStack;

