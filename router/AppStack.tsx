import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import Bolsa from "../pages/Bolsa";
import RestaurantProfile from "../pages/RestaurantProfile";
import RestaurantScreen from "../pages/RestaurantScreen";
import UserProfile from "../pages/UserProfile";


const Stack = createNativeStackNavigator();
function AppStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="Bag" component={Bolsa} />
      <Stack.Screen name="RestaurantProfile" component={RestaurantProfile} />
      <Stack.Screen name="Menu" component={RestaurantScreen} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      {/* <Stack.Screen name="Login" component={LoginPage} /> */}
    </Stack.Navigator>
  );
}

export default AppStack;

