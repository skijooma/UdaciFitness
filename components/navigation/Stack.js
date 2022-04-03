import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Platform } from "react-native";
import { purple, white } from "../../utils/colors";
import AddEntry from "../AddEntry";
import EntryDetail from "../EntryDetail";
import History from "../History";
import HomeScreen from "../HomeScreen";


const Stack = createNativeStackNavigator();
const Tab =
	Platform.OS === 'ios'
		? createBottomTabNavigator()
		: createMaterialTopTabNavigator();

const HomeStack = () => {

	return (
		<Stack.Navigator
			// screenOptions={{
			// 	headerShown: false,
			// }}
		>
			<Stack.Screen name="Home" component={HomeScreen} />
			<Stack.Screen
				name="EntryDetail"
				component={EntryDetail}
				options={{
					title: 'Entry Details',
					headerTintColor: white,
					headerStyle: {
						backgroundColor: purple,
					}
				}}
			/>
		</Stack.Navigator>
	);
}

export { HomeStack };
