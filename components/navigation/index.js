import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { UdaciStatusBar } from "../../App";
import { purple } from "../../utils/colors";
import { HomeStack } from "./Stack";


const index = () => {

	return (
		<NavigationContainer>
			<UdaciStatusBar backgroundColor={ purple } barStyle="light-content" />
			<HomeStack />
		</NavigationContainer>
	)
}

export default index;
