import DB from 'react-native-db-models';
import uuid from 'uuid/v4';

const cardDB = new DB.create_db('mobile-flashcards:card');

export function createCard({question, answer, deckId}) {
	const now = Date.now();

	return new Promise(resolve =>
		cardDB.add({
			question,
			answer,
			created: now,
			id: uuid(),
			modified: now,
			deckId,
		}, resolve)
	);
}

export function getCard({id}) {

}

export function updateCard({id}) {

}

export function getCards(deckId) {
	if (deckId) {
		return new Promise(resolve =>
			cardDB.get({deckId}, resolve)
		);
	}
	else {
		return new Promise(resolve =>
			cardDB.get_all(({rows}) =>
				resolve(Object.getOwnPropertyNames(rows).map(key => rows[key]))
			)
		);
	}
}

