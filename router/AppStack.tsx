import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RestaurantProfile from "../pages/RestaurantProfile";
import RestaurantScreen from "../pages/RestaurantScreen";
import UserProfile from "../pages/UserProfile";
import HomeRestaurant from "../pages/HomeRestaurant";


const Stack = createNativeStackNavigator();
function AppStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="RestaurantProfile" component={RestaurantProfile} />
      <Stack.Screen name="Menu" component={RestaurantScreen} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="HomeRestaurant" component={HomeRestaurant} />
      {/* <Stack.Screen name="Login" component={LoginPage} /> */}
    </Stack.Navigator>
  );
}

export default AppStack;

