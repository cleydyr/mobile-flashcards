import DB from 'react-native-db-models';
import uuid from 'uuid/v4';

const deckDB = new DB.create_db('mobile-flashcards:deck');

export function createDeck({name}) {
	const now = Date.now();

	return new Promise(resolve =>
		deckDB.add({
			name,
			created: now,
			id: uuid(),
			modified: now,
			image: 'salmon',
		}, resolve)
	);
}

export function getDeck({id}) {

}

export function updateDeck({id}) {

}

export function getDecks() {
	return new Promise(resolve =>
		deckDB.get_all(({rows}) =>
			resolve(Object.getOwnPropertyNames(rows).map(key => rows[key]))
		)
	);
}

export function deleteAll() {
	return new Promise(resolve =>
		deckDB.erase_db(data =>
			console.log(data) || resolve(data)
		)
	);
}