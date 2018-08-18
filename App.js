import React from 'react';
import {
	StyleSheet,
	ScrollView,
	View,
	TouchableOpacity,
} from 'react-native';
import Card from './components/lexicon/core/Card';
import {createStackNavigator} from 'react-navigation';
import Header from './components/lexicon/satellite/Header';

const decks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(() => [
	{
		title: 'Hungarian',
		created: '7 days ago',
		image: 'salmon'
	},
	{
		title: 'React',
		created: '7 days ago',
		image: 'purple'
	},
	{
		title: 'Leadership',
		created: '7 days ago',
		image: 'mediumaquamarine'
	},
	{
		title: 'Learning',
		created: '7 days ago',
		image: 'honeydew'
	},
	{
		title: 'Fitness',
		created: '7 days ago',
		image: 'azure'
	},
]).reduce((acc, cur) =>
	acc.concat(cur), []);

const DecksView = ({navigation}) => (
	<ScrollView>
		<Header
			title='My Decks'
			leftButtons={[
				{
					icon: 'angle-left',
				},
			]}
			rightButtons={[
				{
					icon: 'cog',
				},
				{
					icon: 'plus',
				},
				{
					icon: 'play',
				},
			]}/>
		<View style={styles.container} >
			{
				decks.map((deck, index) =>
					<TouchableOpacity key={index} onPress={() => navigation.navigate(
							'DeckDetail',
							deck
					)}>
						<View key={index} style={{marginBottom: 12, marginTop: 12, marginLeft: 12, marginRight: 12}}>
								<Card	{...deck}	/>
						</View>
					</TouchableOpacity>
				)
			}
		</View>
	</ScrollView>
);

class DeckDetail extends React.Component {
	render() {
		const {navigation} = this.props;
		const deck = navigation.state.params;
		const goBack = () => navigation.goBack();

		return (
			<View>
				<Header
					title={deck.title}
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

const Stack = createStackNavigator({
	Home: {
		screen: DecksView,
		navigationOptions: {
      header: null
    }
	},
	DeckDetail: {
		screen: DeckDetail,
		navigationOptions: {
      header: null
    }
	}
});

export default class App extends React.Component {
  render() {
    return (
			<Stack />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
		backgroundColor: '#F1F2F5',
		justifyContent: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap',
  },
});
