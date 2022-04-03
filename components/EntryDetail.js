import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { white } from "../utils/colors";
import MetricCard from "./MetricCard";


function EntryDetail({ navigation, route, metrics, entryId }) {

	console.log("METRICS => ", metrics, " - entryId - ", entryId);

	useEffect(() => {
		// const { entryId } = route.params;
		const year = entryId.slice(0, 4);
		const month = entryId.slice(5, 7);
		const day = entryId.slice(8);

		navigation.setOptions({ title: `${month}/${day}/${year}` });
	}, []);

	return (
		<View style={styles.container}>
			<MetricCard date = {entryId} metrics = {metrics}/>
			<Text>Entry Detail - {route.params.entryId}</Text>
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

export default connect(mapStateToProps)(EntryDetail);
