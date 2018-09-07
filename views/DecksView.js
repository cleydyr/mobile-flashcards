import React from 'react';
import {
	View,
	Modal,
	Text,
	StyleSheet,
	ActivityIndicator,
} from 'react-native';
import NewDeckForm from './NewDeckForm';
import {
	LIGHT, MAIN, WHITE,
} from '../components/lexicon/foundation/Color';
import {
	createDeck,
	getDecks,
} from '../api/DeckService';
import {
	DECK_DETAIL,
 } from './StackedViews';
import Header from '../components/lexicon/satellite/Header';
import { getCards } from '../api/CardService';
import { Deck } from '../components/lexicon/core/Deck';

export default class DecksView extends React.Component {
	constructor() {
		super();
		this.state = {
			modalVisible: false,
			decks: [],
			loading: false,
		}
	}

	fetchDecksAndCardsCount = async () => {
		const [decks, cards] = await Promise.all([
			getDecks(),
			getCards(),
		]);

		this.setState({
			decks: decks.map(deck => ({...deck, cardsCount: cards.filter(card => card.deckId === deck.id).length})),
		});
	}

	async componentDidMount() {
		this.showLoading();

		this.fetchDecksAndCardsCount();

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

	toogleActive = id => {
		this.setState(({decks}) => ({
			decks: decks.map(deck => deck.id === id ? {...deck, selected: !deck.selected} : deck)
		}));
	}

	saveNewDeck = async (name) => {
		const {navigation} = this.props;

		this.showLoading();

		const newDeck = await createDeck({name});

		this.toogleModalVisibility();

		this.fetchDecksAndCardsCount();

		navigation.navigate(DECK_DETAIL, newDeck);

		this.hideLoading();
	}

	NewDeckModalForm = ({modalVisible, onRequestClose, onCancel, onSave}) => (
		<Modal
					animationType="slide"
					transparent={false}
					visible={modalVisible}
					onRequestClose={onRequestClose}
				>
					<NewDeckForm
						onCancel={onCancel}
						onSave={onSave}
					/>
		</Modal>
	)

	ActivityIndicatorModal = ({visible}) => (
		<Modal
			animationType="fade"
			transparent={true}
			visible={visible}
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
	)
	render() {
		const {navigation} = this.props;
		const {decks, modalVisible, loading} = this.state;

		return (
			<React.Fragment>
				<Header title="My decks"/>

				{/* <ScrollView>
					<FlatList
						data={decks}
						renderItem={
							({item}) =>
								<TouchableOpacity onPress={() => navigation.navigate(
										DECK_DETAIL,
										item
								)}>
									<ListItem
										active={item.selected}
										title={item.name}
										description={`${item.cardsCount} cards`}
										onValueChange={() => this.toogleActive(item.id)}
									/>
								</TouchableOpacity>
						}
						keyExtractor={item => item.id}
					/>
				</ScrollView> */}
				<View style={{
					justifyContent: 'space-around',
					alignItems: 'center',
					flex: 1,
				}}>
					<Deck filled>
						<Text style={{fontSize: 40}}>Olá mundo!</Text>
					</Deck>
				</View>
				<this.NewDeckModalForm
					modalVisible={modalVisible}
					onRequestClose={this.toogleModalVisibility}
					onCancel={this.toogleModalVisibility}
					onSave={this.saveNewDeck}
				/>

				<this.ActivityIndicatorModal visible={loading} />
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