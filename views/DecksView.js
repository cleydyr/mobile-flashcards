import React from 'react';
import {
	View,
	Modal,
	TouchableOpacity,
	ScrollView,
	StyleSheet,
	ActivityIndicator,
} from 'react-native';
import NewDeckForm from './NewDeckForm';
import ManagementToolbar from '../components/lexicon/core/toolbars/ManagementToolbar';
import Card from '../components/lexicon/core/Card';
import {
	LIGHT, MAIN,
} from '../components/lexicon/foundation/Color';
import {
	createDeck,
	getDecks,
} from '../api/DeckService';
import {
	DECK_DETAIL,
 } from './StackedViews';
import Header from '../components/lexicon/satellite/Header';

export default class DecksView extends React.Component {
	constructor() {
		super();
		this.state = {
			modalVisible: false,
			decks: [],
			loading: false,
		}
	}

	async componentDidMount() {
		this.showLoading();

		const decks = await getDecks();

		this.setState({
			decks,
		});

		this.hideLoading();
	}

	showLoading = () => {
		this.setState({
			loading: true,
		})
	}

	hideLoading = () => {
		this.setState({
			loading: false,
		})
	}

	toogleModalVisibility = () => {
		this.setState(prevState => ({
			modalVisible: !prevState.modalVisible,
		}))
	}

	saveNewDeck = async (name) => {
		const {navigation} = this.props;

		this.showLoading();

		const newDeck = await createDeck({name});

		this.toogleModalVisibility();

		const decks = await getDecks();

		this.setState({
			decks,
		});

		navigation.navigate(DECK_DETAIL, newDeck);

		this.hideLoading();
	}

	render() {
		const {navigation} = this.props;
		const {decks} = this.state;

		return (
			<React.Fragment>
				<Header title="My decks"/>
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
				<Modal
					animationType="fade"
					transparent={true}
					visible={this.state.loading}
					onRequestClose={() => {}}
				>
					<View style={{
						justifyContent: 'center',
						alignItems: 'center',
						flex: 1,
					}}>
						<ActivityIndicator
							size='large'
							color={MAIN}
						/>
					</View>
				</Modal>
				<ScrollView>
					<View style={styles.container} >
						{
							decks.map((deck, index) =>
								<TouchableOpacity key={index} onPress={() => navigation.navigate(
										DECK_DETAIL,
										deck
								)}>
									<View key={index} style={{marginBottom: 12, marginTop: 12, marginLeft: 12, marginRight: 12}}>
											<Card	{...deck} title={deck.name}	/>
									</View>
								</TouchableOpacity>
							)
						}
					</View>
				</ScrollView>
			</React.Fragment>
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