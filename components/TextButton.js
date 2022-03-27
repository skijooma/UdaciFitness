import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { purple } from "../utils/colors";


export default function TextButton({ children, onPress, style = {} }) {

	return (
		<View styles = {[styles.reset, style]}>
			<TouchableOpacity
				onPress = {onPress}
			>
				<Text>{children}</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	reset: {
		textAlign: "center",
		color: purple
	}
})
