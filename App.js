import React from 'react';
import {createStackNavigator} from 'react-navigation';
import {
	MAIN,
} from './components/lexicon/foundation/Color';
import NewDeckForm from './views/NewDeckForm';
import DecksView from './views/DecksView';
import DeckDetail from './views/DeckDetail';

const defaultNavigationOptions = {
	headerStyle: {
		height: 0,
		backgroundColor: MAIN,
	},
};

const Stack = createStackNavigator({
	Home: {
		screen: DecksView,
		navigationOptions: defaultNavigationOptions,
	},
	DeckDetail: {
		screen: DeckDetail,
		navigationOptions: defaultNavigationOptions,
	},
	NewDeckForm: {
		screen: NewDeckForm,
		navigationOptions: defaultNavigationOptions,
	}
});

export default class App extends React.Component {
  render() {
    return (
			<Stack />
    );
  }
}
