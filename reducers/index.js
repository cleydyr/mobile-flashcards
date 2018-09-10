import {
	actions,
} from '../actions';

const initialState = {
	cards: [],
	decks: [],
}

export default function reducer(state = initialState, action) {
	const {
		card,
		deck,
		decks,
		cards,
	} = action;

	switch(action.type) {
		case actions.ADD_CARD:
			return {
				...state,
				cards: [...state.cards, card],
			};

		case actions.ADD_DECK:
			return {
				...state,
				decks: [...state.decks, deck],
			};

		case actions.UPDATE_CARDS:
			return {
				...state,
				cards,
			};

		case actions.UPDATE_DECKS:

			return {
				...state,
				decks,
			};

		default:
			return state;
	}
}