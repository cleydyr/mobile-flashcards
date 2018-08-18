import React from 'react';
import {View, Text,} from 'react-native';
import Badge from './Badge';

export default class Card extends React.Component {
	render() {
		const {title, created, image} = this.props;
		return (
			<View style={{elevation: 5, backgroundColor: 'white'}}>
				<View style={{width: 288, height: 160, backgroundColor: image, justifyContent: 'flex-end'}}>
					<View style={{margin: 16}}><Badge number={17}></Badge></View>
				</View>
				<View style={{width: 288, height: 94}} >
					<View style={{marginLeft: 16, marginTop: 12}} >
						<View style={{height: 21}}><Text style={{fontWeight: '600', color: '#272833', fontSize: 14}}>{title}</Text></View>
						<View style={{height: 21}}><Text style={{fontWeight: '400', color: '#6B6C7E', fontSize: 14}}>Created {created}</Text></View>
					</View>
				</View>
			</View>
		)
	}
}
