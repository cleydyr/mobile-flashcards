import React from 'react';
import {
	StyleSheet,
	ScrollView,
	View,
	TouchableOpacity,
	Text,
	StatusBar,
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
	static navigationOptions = ({navigation}) => {
		const deck = navigation.state.params;
		return {
			title: deck.title,
			header: () => <Header />,
		}
	}

	render() {
		const {navigation} = this.props;
		return (
			<View><Text>Deck</Text></View>
		);
	}
}

const Stack = createStackNavigator({
	Home: {
		screen: DecksView,
	},
	DeckDetail: {
		screen: DeckDetail,
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
		backgroundColor: '#fff',
		justifyContent: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap',
		padding: 15,
  },
});
