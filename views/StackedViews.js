import {createStackNavigator} from 'react-navigation';
import DecksView from './DecksView';
import DeckDetail from './DeckDetail';
import { MAIN } from '../components/lexicon/foundation/Color';
import Quiz from './Quiz';

const defaultNavigationOptions = {
	headerStyle: {
		height: 0,
		backgroundColor: MAIN,
	},
};

export const HOME = 'Home';
export const DECK_DETAIL = 'DeckDetail';
export const QUIZ = 'Quiz';

const views = [
	{
		name: HOME,
		component: DecksView,
	},
	{
		name: DECK_DETAIL,
		component: DeckDetail,
	},
	{
		name: QUIZ,
		component: Quiz,
	},
];

const stack = views.reduce((acc, {name, component}) => {
		return {
			...acc,
			[name]: {
				screen: component,
				navigationOptions: defaultNavigationOptions,
			}
		}
	}, {});

export default Stack = createStackNavigator(stack);