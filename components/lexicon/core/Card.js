import React from 'react';
import {View, Text,} from 'react-native';
import Badge from './Badge';
import {
	WHITE,
	MAIN,
	MAIN_L28_D5,
} from '../foundation/Color';

export default class Card extends React.Component {
	render() {
		const {title, created, image} = this.props;
		return (
			<View style={{elevation: 5, backgroundColor: WHITE}}>
				<View style={{width: 288, height: 160, backgroundColor: image, justifyContent: 'flex-end'}}>
					<View style={{margin: 16}}><Badge number={17}></Badge></View>
				</View>
				<View style={{width: 288, height: 94}} >
					<View style={{marginLeft: 16, marginTop: 12}} >
						<View style={{height: 21}}><Text style={{fontWeight: '600', color: MAIN, fontSize: 14}}>{title}</Text></View>
						<View style={{height: 21}}><Text style={{fontWeight: '400', color: MAIN_L28_D5, fontSize: 14}}>Created {created}</Text></View>
					</View>
				</View>
			</View>
		)
	}
}
