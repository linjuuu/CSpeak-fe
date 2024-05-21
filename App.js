import Login from "./screens/Login";
import Interview from "./screens/Interview";

import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export default function App() {
  const Stack = createStackNavigator();

  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="Interview" component={Interview} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>


  )
}
