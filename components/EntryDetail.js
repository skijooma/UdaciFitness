import React from 'react';
import { View, Text } from 'react-native';

export default function EntryDetail (props) {

	return (
		<View>
			<Text>Entry Detail - { props.route.params.entryId }</Text>
		</View>
	)
}
