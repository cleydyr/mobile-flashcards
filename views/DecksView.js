import React from 'react';
import {
	View,
	Modal,
	TouchableOpacity,
	ScrollView,
	StyleSheet,
} from 'react-native';
import NewDeckForm from './NewDeckForm';
import {
	LIGHT,
} from '../components/lexicon/foundation/Color';
import {
	DECK_DETAIL,
 } from './StackedViews';
import Header from '../components/lexicon/satellite/Header';
import { FlatList } from 'react-native-gesture-handler';
import ListItem from '../components/lexicon/core/ListItem';
import ActivityIndicatorModal from '../components/ActivityIndicatorModal';
import { fetchCards, fetchDecks, addDeck } from '../actions';
import { connect } from 'react-redux';

class DecksView extends React.Component {
	constructor() {
		super();
		this.state = {
			modalVisible: false,
			decks: [],
			loading: false,
		}
	}

	async componentDidMount() {
		const {dispatchFetchCards, dispatchFetchDecks} = this.props;

		this.showLoading();

		dispatchFetchCards();

		dispatchFetchDecks();

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
		const {
			navigation,
			dispatchAddDeck,
			dispatchFetchCards,
			dispatchFetchDecks,
		} = this.props;

		this.showLoading();

		const newDeck = await dispatchAddDeck({name});

		this.toogleModalVisibility();

		dispatchFetchCards();

		dispatchFetchDecks();

		navigation.navigate(DECK_DETAIL, newDeck);

		this.hideLoading();
	}

	NewDeckFormModal = ({onRequestClose, onCancel, onSave, modalVisible}) => (
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
	);

	ContentView = ({decks, cards, navigation}) => (
		<ScrollView>
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
								description={`${cards.filter(card => card.deckId === item.id).length} cards`}
							/>
						</TouchableOpacity>
				}
				keyExtractor={item => item.id}
			/>
		</ScrollView>
	);

	render() {
		const {navigation, decks, cards} = this.props;
		const {modalVisible, loading} = this.state;

		return (
			<React.Fragment>
				<Header
					title="My decks"
					rightButtons={[{
						icon: 'plus',
						onPress: this.toogleModalVisibility
					}]}
				/>

				<this.ContentView
					navigation={navigation}
					decks={decks}
					cards={cards}
				/>

				<this.NewDeckFormModal
					onRequestClose={this.toogleModalVisibility}
					onCancel={this.toogleModalVisibility}
					onSave={this.saveNewDeck}
					modalVisible={modalVisible}
				/>
				<ActivityIndicatorModal loading={loading}/>
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

const mapStateToProps = ({decks, cards}) => ({
	decks,
	cards,
});

const mapDispatchToProps = dispatch => ({
	dispatchFetchCards: () => dispatch(fetchCards()),
	dispatchFetchDecks: () => dispatch(fetchDecks()),
	dispatchAddDeck: ({name}) => dispatch(addDeck({name})),
});

export default connect(mapStateToProps, mapDispatchToProps)(DecksView);