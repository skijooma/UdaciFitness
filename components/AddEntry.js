import { Ionicons } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { addEntry } from '../actions';
import { removeEntry, submitEntry } from "../utils/api";
import { purple, white } from "../utils/colors";
import {
	getDailyReminderValue,
	getMetricMetaInfo,
	timeToString,
	clearLocalNotification,
	setLocalNotification,
} from "../utils/helpers";
import DateHeader from "./DateHeader";
import TextButton from "./TextButton";
import UdaciSlider from "./UdaciSlider";
import UdaciSteppers from "./UdaciSteppers";


function SubmitButton ({onPress}) {

	return (
		<TouchableOpacity
			style={ Platform.OS === "ios" ? styles.iosSubmitBtn : styles.androidSubmitBtn }
			onPress = { onPress }
		>
			<Text style={ styles.submitBtnText }>SUBMIT</Text>
		</TouchableOpacity>
	)
}

class AddEntry extends Component {

	state = {
		'run': 0,
		'bike': 0,
		'swim': 0,
		'eat': 0,
		'sleep': 0
	}

	increment = (metric) => {

		this.setState((state) => {

			const { max, step } = getMetricMetaInfo(metric);
			const count = state[metric] + step;

			return {
				...state,
				[metric]: count > max ? max: count
			}
		})
	}

	decrement = (metric) => {

		this.setState((state) => {

			const count = state[metric] - getMetricMetaInfo(metric).step;

			return {
				...state,
				[metric]: count < 0 ? 0: count
			}
		})
	}

	slide = (metric, value) => {

		this.setState(() => ({
			[metric]: value
		}))
	}

	submit = () => {

		const key = timeToString();
		const entry = this.state;

		// Update Redux
		this.props.dispatch(addEntry({
			[key]: entry
		}));

		this.setState(() => ({
			'run': 0,
			'bike': 0,
			'swim': 0,
			'eat': 0,
			'sleep': 0
		}))

		this.toHome(); // Navigating to home.

		submitEntry(key, entry); // Save to 'database'

		// Clearing local notification.
		clearLocalNotification()
			.then(setLocalNotification)

	}

	reset = () => {

		const key = timeToString();

		// Update Redux
		this.props.dispatch(addEntry({
			[key]: getDailyReminderValue()
		}))

		// Navigate to home
		this.toHome();

		// Save to 'database'
		removeEntry(key);

	}

	toHome = () => {
		this.props.navigation.dispatch(CommonActions.goBack());
	}

	render () {

		const metaInfo = getMetricMetaInfo();

		if (this.props.alreadyLogged) {

			return (
				<View style={ styles.center }>
					<Ionicons
						name = { Platform.OS === "ios" ? "ios-happy-outline" : "md-happy"}
						size = { 100 }
					/>
					<Text style={{ padding: 10 }}>You have already logged your info. for today!</Text>
					<TextButton onPress = { this.reset }>
						Reset
					</TextButton>
				</View>
			)
		}

		return (
			<View style={ styles.container }>
				<DateHeader date = { (new Date()).toLocaleDateString() } />
				{/*<Text> { JSON.stringify(this.state) } </Text>*/}
				{ Object.keys(metaInfo).map((key) => {

					const { getIcon, type, ...rest } = metaInfo[key];
					const value = this.state[key];

					return (
						<View style={ styles.row } key = { key }>
							{ getIcon() }
							{ type === 'slider'
								? <UdaciSlider
									value = { value }
									onChange = { (value) => this.slide(key, value)}
									{ ...rest }
								/>
								: <UdaciSteppers
									value = { value }
									onIncrement = { () => this.increment(key) }
									onDecrement = { () => this.decrement(key) }
									{ ...rest }
								/>}
						</View>
					)
				})}
				<SubmitButton onPress = { this.submit }>
					Reset
				</SubmitButton>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: white,
	},
	row: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	iosSubmitBtn: {
		backgroundColor: purple,
		padding: 10,
		borderRadius: 7,
		height: 45,
		marginLeft: 40,
		marginRight: 40,
	},
	androidSubmitBtn: {
		backgroundColor: purple,
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30,
		height: 45,
		borderRadius: 2,
		alignSelf: "flex-end",
		justifyContent: "center",
		alignItems: "center",
	},
	submitBtnText: {
		color: white,
		fontSize: 22,
		textAlign: "center"
	},
	center: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 30,
		marginLeft: 30,
	}
});

function mapStateToProps(state) {

	const key = timeToString();

	return {

		alreadyLogged: state[key] && typeof state[key].today === 'undefined'
	}

}

export default connect(mapStateToProps) (AddEntry);
