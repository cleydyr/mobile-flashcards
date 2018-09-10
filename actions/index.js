import { createCard, getCards } from "../api/CardService";
import { createDeck, getDecks } from "../api/DeckService";

const actionList = [
	'ADD_CARD',
	'ADD_DECK',
	'UPDATE_CARDS',
	'UPDATE_DECKS',
];

export const actions = actionList.reduce(
	(acc, cur) =>
		({
			...acc,
			[cur]: cur,
		}),

	{});

export function addCard(card) {
	return async dispatch => {
		const newCard = await createCard(card);

		return dispatch({
			type: actions.ADD_CARD,
			card: newCard,
		});
	};
}

export function addDeck(deck) {
	return async dispatch => {
		const newDeck = await createDeck(deck);

		return dispatch({
			type: actions.ADD_DECK,
			deck: newDeck,
		});
	};
}

export function fetchDecks() {
	return async dispatch => {
		const decks = await getDecks();

		return dispatch({
			type: actions.UPDATE_DECKS,
			decks,
		});
	};
}

export function fetchCards() {
	return async dispatch => {
		const cards = await getCards();

		return dispatch({
			type: actions.UPDATE_CARDS,
			cards,
		});
	};
}