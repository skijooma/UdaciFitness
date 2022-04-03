import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { HomeStack } from "./Stack";


const index = () => {

	return (
		<NavigationContainer>
			<HomeStack />
		</NavigationContainer>
	)
}

export default index;
