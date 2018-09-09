import React from 'react';
import {
	View,
	Text,
	StyleSheet,
} from 'react-native';
import Header from '../components/lexicon/satellite/Header';
import Button from '../components/lexicon/core/Button';
import { MAIN, WHITE } from '../components/lexicon/foundation/Color';
import { clearLocalNotification, setLocalNotification } from '../api/NotificationService';

const QUESTION = 'question';
const ANSWER = 'answer';

export default class Quiz extends React.Component {
	state = {}

	async componentDidUpdate() {
		if (!this.isOngoingQuiz()) {
			await clearLocalNotification();
			setLocalNotification();
		}
	}

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

	isOngoingQuiz = () => (this.state.currentCardIndex < this.state.cards.length)

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
				<React.Fragment>
					<View style={styles.contentView}>
						<Text style={styles.mainText}>
							{
								this.isOngoingQuiz() ?
										cards[currentCardIndex][currentCardState]
										: this.getScoreMessage()
							}
						</Text>
					</View>
					<View style={{
						backgroundColor: WHITE,
					}}>
						{
							!this.isOngoingQuiz() &&
								<React.Fragment>
									<Button
										type="primary"
										style={styles.button}
										onPress={this.restartQuiz}
									>
										<Text>Restart Quiz</Text>
									</Button>
									<Button
										type="primary"
										style={styles.button}
										onPress={this.navigateToDeckView}
									>
										<Text>Back to Deck</Text>
									</Button>
							</React.Fragment>
						}
						{
							this.isOngoingQuiz() && currentCardState === QUESTION &&
							<Button
								type="primary"
								style={styles.button}
								onPress={this.showAnswer}
							>
								<Text>Show answer</Text>
							</Button>
						}
						{
							this.isOngoingQuiz() && currentCardState === ANSWER &&
								<React.Fragment>
									<Button
										type="primary"
										style={styles.button}
										onPress={() => this.markCurrentCard({correct: true})}
									>
										<Text>Correct</Text>
									</Button>
									<Button
										type="primary"
										style={styles.button}
										onPress={() => this.markCurrentCard({correct: false})}
									>
										<Text>Incorrect</Text>
									</Button>
								</React.Fragment>
						}
					</View>
					</React.Fragment>
			</View>

		);
	}
}

const styles = StyleSheet.create({
	button: {
		borderRadius: 4,
		margin: 16,
	},
	contentView: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
	mainText: {
		fontSize: 40,
		fontWeight: '600',
		textAlign: 'center',
		color: MAIN,
	}
})