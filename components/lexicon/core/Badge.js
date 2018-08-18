import React from 'react';
import {View, Text} from 'react-native';

export default class Card extends React.Component {
	render() {
		const {number, type} = this.props;
		return (
			<View style={{
					justifyContent: 'center',
					alignItems	: 'center',
					backgroundColor: '#2E5AAC',
					height: 16,
					borderRadius: 10,
					alignSelf: 'flex-start',
				}}>
				<Text style={{
						color: 'white',
						fontSize: 12,
						paddingHorizontal: 4,
						paddingVertical: 1.5,
					}}>{number}</Text>
			</View>
		);
	}
}