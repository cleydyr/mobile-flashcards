import React from 'react';
import {
	View,
	Modal,
	ActivityIndicator,
	Text,
	ScrollView,
	FlatList
} from 'react-native';
import Header from '../components/lexicon/satellite/Header';
import NewCardForm from './NewCardForm';
import {
	MAIN,
} from '../components/lexicon/foundation/Color';
import { createCard, getCards } from '../api/CardService';
import ListItem from '../components/lexicon/core/ListItem';
import { QUIZ } from './StackedViews';
import { addCard } from '../actions';
import { connect } from 'react-redux';

class DeckDetail extends React.Component {
	constructor() {
		super();
		this.state = {
			modalVisible: false,
			loading: false,
		}
	}

	async componentDidMount() {
		const {navigation} = this.props;
		const {id} = navigation.state.params;

		this.showLoading();

		const cards = await getCards(id);

		this.setState({
			cards,
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

	startQuiz = () => {
		const {navigation} = this.props;
		const {cards} = this.props;

		navigation.navigate(QUIZ, cards);
	}

	saveNewCard = async ({question, answer}) => {
		const {navigation, dispatchAddCard} = this.props;
		const {id} = navigation.state.params;

		this.showLoading();

		await dispatchAddCard({question, answer, deckId: id});

		this.toogleModalVisibility();

		this.hideLoading();
	}

	render() {
		const {navigation, cards} = this.props;
		const deck = navigation.state.params;
		const {loading, modalVisible} = this.state;
		const playButton = {
			icon: 'play',
			onPress: this.startQuiz,
		};
		const plusButton = {
			icon: 'plus',
			onPress: this.toogleModalVisibility
		};
		const rightButtons = cards.length > 0 ? [plusButton, playButton] : [plusButton];

		return (
			<View>
				<Header
					title={deck.name}
					subtitle={`${cards.length ? cards.length : 'No'} ${cards.length > 1 || cards.length == 0 ? 'cards' : 'card'}`}
					rightButtons={rightButtons}/>
				<Modal
					animationType="slide"
					transparent={false}
					visible={modalVisible}
					onRequestClose={this.toogleModalVisibility}
				>
					<NewCardForm
						onCancel={this.toogleModalVisibility}
						onSave={(this.saveNewCard)}
					/>
				</Modal>
				<Modal
					animationType="fade"
					transparent={true}
					visible={loading}
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
					<FlatList
						data={cards}
						keyExtractor={item => item.id}
						renderItem={
							({item}) => <ListItem title={item.question} />
						}
					/>
				</ScrollView>
			</View>
		);
	}
}

const mapStateToProps = ({cards}, {navigation}) => {
	const {id} = navigation.state.params;

	return {
		cards: cards.filter(card => card.deckId === id),
	};
}

const mapDispatchToProps = dispatch => ({
	dispatchAddCard: (card) => dispatch(addCard(card)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail);