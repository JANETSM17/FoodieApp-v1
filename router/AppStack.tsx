import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "../pages/HomePage";
import RestaurantProfile from "../pages/RestaurantProfile";
import RestaurantScreen from "../pages/RestaurantScreen";
import UserProfile from "../pages/UserProfile";
import HomeRestaurant from "../pages/HomeRestaurant";
import Bolsa from "../pages/Bolsa";
import BagFinalDetails from "../pages/BagFinalDetails";
import Pedidos from "../pages/Pedidos";


const Stack = createNativeStackNavigator();
function AppStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="RestaurantProfile" component={RestaurantProfile} />
      <Stack.Screen name="Menu" component={RestaurantScreen} />
      <Stack.Screen name="ClientProfile" component={UserProfile} />
      <Stack.Screen name="HomeRestaurant" component={HomeRestaurant} />
      <Stack.Screen name="Bolsa" component={Bolsa} />
      <Stack.Screen name="BagFinalDetails" component={BagFinalDetails} />
      <Stack.Screen name="Pedidos" component={Pedidos} />
    </Stack.Navigator>
  );
}

export default AppStack;

