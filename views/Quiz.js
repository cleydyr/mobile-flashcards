import React from 'react';
import {
	View,
	Text,
} from 'react-native';
import Header from '../components/lexicon/satellite/Header';
import Button from '../components/lexicon/core/Button';
import { MAIN } from '../components/lexicon/foundation/Color';
import { DECK_DETAIL } from './StackedViews';
import { getDeck } from '../api/DeckService';

const QUESTION = 'question';
const ANSWER = 'answer';

export default class Quiz extends React.Component {
	state = {}

	static getDerivedStateFromProps(props) {
		const cards = props.navigation.state.params;
		return {
			currentCardIndex: 0,
			cards: cards,
			currentCardState: QUESTION,
			correctAnswers: 0,
		};
	}

	showAnswer = () => {
		this.setState({
			currentCardState: ANSWER,
		})
	}

	markCurrentCard = ({correct}) =>
		this.setState(prevState => ({
			currentCardIndex: prevState.currentCardIndex + 1,
			currentCardState: QUESTION,
			correctAnswers: prevState.correctAnswers + (correct ? 1 : 0),
		}))

	static getRemainingCardsMessage = (remainingCardsCount) =>
		`${remainingCardsCount ? remainingCardsCount : 'No'} ${remainingCardsCount > 1 || remainingCardsCount == 0 ? 'cards' : 'card'} remaining`;

	getScoreMessage = () =>
		`Your score is ${100.0*this.state.correctAnswers/this.state.cards.length}%`

	navigateToDeckView = () => {
		const {navigation} = this.props;
		navigation.goBack();
	}

	restartQuiz = () => {
		this.setState({
			currentCardIndex: 0,
			currentCardState: QUESTION,
			correctAnswers: 0,
		});
	}

	render() {
		const {
			currentCardState,
			cards,
			currentCardIndex,
		} = this.state;

		return (
			<View style={{
					flex: 1,
			}}>
				<Header
					title="Quiz"
					subtitle={Quiz.getRemainingCardsMessage(cards.length - currentCardIndex)}
				/>
				{
					(currentCardIndex < cards.length) ?
						<React.Fragment>
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
									{
										cards[currentCardIndex][currentCardState]
									}
								</Text>
							</View>
							<View style={{
								flexDirection: 'row',
							}}>
								{
									currentCardState === QUESTION &&
									<Button
										type="primary"
										style={{
											borderRadius: 0,
										}}
										onPress={this.showAnswer}
									>
										<Text>Show answer</Text>
									</Button>
								}
								{
									currentCardState === ANSWER &&
									<React.Fragment>
										<Button
											type="primary"
											style={{
												borderRadius: 0,
											}}
											onPress={() => this.markCurrentCard({correct: true})}
										>
											<Text>Correct</Text>
										</Button>
										<Button
											type="primary"
											style={{
												borderRadius: 0,
											}}
											onPress={() => this.markCurrentCard({correct: false})}
										>
											<Text>Incorrect</Text>
										</Button>
									</React.Fragment>
								}
							</View>
						</React.Fragment>
					:
					<React.Fragment>
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
									{this.getScoreMessage()}
								</Text>
							</View>
							<View style={{
								flexDirection: 'row',
							}}>
								<Button
									type="primary"
									style={{
										borderRadius: 0,
									}}
									onPress={this.restartQuiz}
								>
									<Text>Restart Quiz</Text>
								</Button>
								<Button
									type="primary"
									style={{
										borderRadius: 0,
									}}
									onPress={this.navigateToDeckView}
								>
									<Text>Back to Deck</Text>
								</Button>
							</View>
						</React.Fragment>
				}
			</View>

		);
	}
}