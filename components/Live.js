import React, { useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import { Foundation } from "@expo/vector-icons";
import { purple, white } from "../utils/colors";
import * as Location from 'expo-location';
import { calculateDirection } from "../utils/helpers";


export function Live() {

	const [coordinates, setCoordinates] = useState(null);
	const [status, setStatus] = useState(null);
	const [direction, setDirection] = useState('');

	useState(() => {
		Location.getForegroundPermissionsAsync()
			.then(({ status }) => {
				if (status === "granted") {

					return setLocation();
				}

				setStatus(status);
			})
			.catch((e) => {
				console.warn("Error getting location permission", e);

				setStatus("undetermined");
			})
	}, []);

	const askPermission = () => {
		Location.requestForegroundPermissionsAsync()
			.then(({ status }) => {
				if (status === "granted") {
					return setLocation();
				}

				setStatus(status);
			})
			.catch((e) => console.warn("Error asking location permission: ", e));
	}

	const setLocation = () => {
		Location.watchPositionAsync({
			accuracy: Location.Accuracy.High,
			timeInterval: 1,
			distanceInterval: 1,
		}, ({ coords }) => {
			const newDirection = calculateDirection(coords.heading);

			setCoordinates(coords);
			setStatus("granted");
			setDirection(newDirection);
		});
	}

	if (status === null) {

		return (
			<View style = {{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<ActivityIndicator color = {purple} size = "large" style = {{ marginTop: 30 }}/>
			</View>
		);
	}

	if (status === 'denied') {

		return (
			<View style = {styles.center}>
				<Foundation name = "alert" size = {50}/>
				<Text>
					You denied your location. You can fix this by visiting your settings and enabling location services
					for this app.
				</Text>
			</View>
		);
	}

	if (status === 'undetermined') {

		return (
			<View styles = {styles.center}>
				<Foundation name = "alert" size = {50}/>
				<Text>
					You need to enable location services for this app.
				</Text>
				<TouchableOpacity onPress = {askPermission} style = {styles.button}>
					<Text style = {styles.buttonText}>
						Enable
					</Text>
				</TouchableOpacity>
			</View>
		);
	}

	return (
		<View style = {styles.container}>
			<View style = {styles.directionContainer}>
				<Text style = {styles.header}>You're heading</Text>
				<Text style = {styles.direction}>{ direction }</Text>
			</View>
			<View style = {styles.metricContainer}>
				<View style = {styles.metric}>
					<Text style = {[styles.header, { color: white }]}>
						Altitude
					</Text>
					<Text style = {[styles.subHeader, { color: white }]}>
						{Math.round(coordinates.altitude * 3.2808)} Feet
					</Text>
				</View>

				<View style = {styles.metric}>
					<Text style = {[styles.header, { color: white }]}>
						Speed
					</Text>
					<Text style = {[styles.subHeader, { color: white }]}>
						{Math.round(coordinates.speed * 2.2369).toFixed(1)} MPH
					</Text>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between'
	},
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 30,
		marginRight: 30,
	},
	button: {
		padding: 10,
		backgroundColor: purple,
		alignSelf: 'center',
		borderRadius: 5,
		margin: 20,
	},
	buttonText: {
		color: white,
		fontSize: 20,
	},
	directionContainer: {
		flex: 1,
		justifyContent: "center",
	},
	header: {
		fontSize: 35,
		textAlign: "center",
	},
	direction: {
		color: purple,
		fontSize: 120,
		textAlign: "center",
	},
	metricContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		backgroundColor: purple,
	},
	metric: {
		flex: 1,
		paddingTop: 15,
		paddingBottom: 15,
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		marginTop: 20,
		marginBottom: 20,
		marginLeft: 10,
		marginRight: 10,
	},
	subHeader: {
		fontSize: 25,
		textAlign: "center",
		marginTop: 5
	}
})
