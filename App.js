import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity} from 'react-native';
import Card from './components/lexicon/core/Card';

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

export default class App extends React.Component {
  render() {
    return (
			<ScrollView>
				<View style={styles.container} >
					{
						decks.map((deck, index) =>
						<TouchableOpacity>
							<View key={index} style={{marginBottom: 12, marginTop: 12, marginLeft: 12, marginRight: 12}}>
									<Card	{...deck}	/>
							</View>
						</TouchableOpacity>
						)
					}
				</View>
			</ScrollView>
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
