import React from 'react';
import {
	View,
	Text,
} from 'react-native';
import Header from '../components/lexicon/satellite/Header';
import Button from '../components/lexicon/core/Button';
import { MAIN } from '../components/lexicon/foundation/Color';

const QUESTION = 1;
const ANSWER = 2;

export default class Quiz extends React.Component {
	constructor() {
		super();
		this.state = {
			currentCardState: QUESTION,
		};
	}

	static getDerivedStateFromProps(props) {
		return {
			currentCardId: props.cards[0].id,
		}
	}

	showAnswer() {

	}

	render() {
		const {navigation} = this.props;
		const cards = navigation.state.params;

		return (
			<View style={{
					flex: 1,
			}}>
				<Header title="Quiz"/>
				<View style={{
					alignItems: 'center',
					justifyContent: 'center',
					flex: 1,
				}}>
					<Text style={{
						fontSize: 40,
						fontWeight: '600',
						textAlign: 'center',
						color: MAIN,
					}}>
						{cards[0].question}
					</Text>
				</View>
				<View>
					<Button
						type="primary"
						style={{
							borderRadius: 0,
						}}
						onPress={this.showAnswer}
					>
						<Text>Show answer</Text>
					</Button>
				</View>
			</View>
		);
	}
}