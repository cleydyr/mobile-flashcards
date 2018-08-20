import React from 'react';
import {
	View,
	Modal,
	TouchableOpacity,
	ScrollView,
	StyleSheet,
} from 'react-native';
import NewDeckForm from './NewDeckForm';
import ManagementToolbar from '../components/lexicon/core/toolbars/ManagementToolbar';
import Card from '../components/lexicon/core/Card';
import {
	LIGHT,
} from '../components/lexicon/foundation/Color';

const decks = Array(1).fill().map(() => [
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

export default class DecksView extends React.Component {
	constructor() {
		super();
		this.state = {
			modalVisible: false,
		}
	}

	toogleModalVisibility = () => {
		this.setState(prevState => ({
			modalVisible: !prevState.modalVisible,
		}))
	}

	saveNewDeck = (data) => {
		//TODO: Handle save new deck action
		this.toogleModalVisibility();
	}

	render() {
		const {navigation} = this.props;
		return (
			<View>
				<ManagementToolbar
					onPlusButtonPress={this.toogleModalVisibility}
				/>
				<Modal
					animationType="slide"
					transparent={false}
					visible={this.state.modalVisible}
					onRequestClose={this.toogleModalVisibility}
				>
					<NewDeckForm
						onCancel={this.toogleModalVisibility}
						onSave={this.saveNewDeck}
					/>
				</Modal>
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
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
		backgroundColor: LIGHT,
		justifyContent: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap',
  },
});