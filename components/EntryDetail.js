import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { white } from "../utils/colors";
import MetricCard from "./MetricCard";
import { addEntry } from "../actions";
import { removeEntry } from "../utils/api";
import { timeToString, getDailyReminderValue } from "../utils/helpers";
import TextButton from './TextButton';


function EntryDetail({ navigation, route, metrics, entryId, remove, goBack }) {

	useEffect(() => {
		const year = entryId.slice(0, 4);
		const month = entryId.slice(5, 7);
		const day = entryId.slice(8);

		navigation.setOptions({ title: `${month}/${day}/${year}` });
	}, []);

	const reset = () => {

		remove();
		goBack();
		removeEntry(entryId);
	}

	return (
		<View style={styles.container}>
			<MetricCard date = {entryId} metrics = {metrics}/>
			<TextButton style={{ margin: 20 }} onPress={reset}>
				RESET
			</TextButton>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: white,
		padding: 15,
	}
});

function mapStateToProps(state, { route }) {

	const { entryId } = route.params;

	return {
		entryId,
		metrics: state[entryId],
	}
}

function mapDispatchToProps(dispatch, { route, navigation }) {

	const { entryId } = route.params;

	return {
		remove: () => dispatch(addEntry({
			[entryId]: timeToString() === entryId
				? getDailyReminderValue()
				: null
		})),
		goBack: () => navigation.goBack(),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail);
