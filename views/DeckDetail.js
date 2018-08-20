import React from 'react';
import {View} from 'react-native';
import Header from '../components/lexicon/satellite/Header';

export default class DeckDetail extends React.Component {
	render() {
		const {navigation} = this.props;
		const deck = navigation.state.params;
		const goBack = () => navigation.goBack();

		return (
			<View>
				<Header
					title={deck.name}
					leftButtons={[
						{
							icon: 'angle-left',
							onPress: goBack,
						},
					]}
					rightButtons={[
						{
							icon: 'cog',
							onPress: goBack,
						},
						{
							icon: 'plus',
							onPress: goBack
						},
						{
							icon: 'play',
							onPress: goBack
						},
					]}/>
			</View>
		);
	}
}