import TokenCheck from "./screens/TokenCheck";
import Login from "./screens/Login";
import Interview from "./screens/Interview";
import Home from "./screens/Home";

import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ChattingRetrieve from "./screens/ChattingRetrieve";
import WriteSelfIntro from "./screens/WriteSelfIntro";
import SelectTopic from "./screens/SelectTopic";
import SelfInterview from "./screens/SelfInterview";
import CheckRating from "./screens/CheckRating";

import Test from "./screens/Test";


export default function App() {
  const Stack = createStackNavigator();

  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TokenCheck">
        <Stack.Screen name="Test" component={Test} options={{headerShown: false}}/>
        <Stack.Screen name="TokenCheck" component={TokenCheck} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="Interview" component={Interview} options={{headerShown: false}}/>
        <Stack.Screen name="ChattingRetrieve" component={ChattingRetrieve} options={{headerShown: false}}/>
        <Stack.Screen name="CheckRating" component={CheckRating} options={{headerShown: false}}/>
        <Stack.Screen name="WriteSelfIntro" component={WriteSelfIntro} options={{headerShown: false}}/>
        <Stack.Screen name="SelectTopic" component={SelectTopic} options={{headerShown: false}}/>
        <Stack.Screen name="SelfInterview" component={SelfInterview} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>


  )
}