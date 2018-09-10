import React from 'react';
import {
	View,
	Text,
	StyleSheet,
} from 'react-native';
import TextInput from '../components/lexicon/core/TextInput';

import { MAIN, PRIMARY_L45, PRIMARY_L23, MAIN_L74, WHITE } from '../components/lexicon/foundation/Color';
import Button from '../components/lexicon/core/Button';

const QUESTION = 'question';
const ANSWER = 'answer';

export default class NewCardForm extends React.Component {
	constructor() {
		super();
		this.state = {
			question: '',
			answer: '',
			phase: QUESTION,
		};
	}

	updateCardQuestion = question => {
		this.setState({
			question
		});
	}

	updateCardAnswer = answer => {
		this.setState({
			answer
		});
	}

	showField = (phase) =>
		this.setState({
			phase,
		});

	getFieldView = (phase) => {
		const {answer, question} = this.state;

		if (phase === ANSWER) {
			return (
				<View style={styles.formComponent}>
					<View style={{
						height: 21,
					}}>
						<Text style={styles.formFieldLabel}>Answer</Text>
					</View>
					<View style={{
						marginTop: 4,
						marginBottom: 4,
					}}>
						<TextInput
							multiline
							numberOfLines={10}
							autoFocus
							onChangeText={this.updateCardAnswer}
							value={answer}
						/>
					</View>
				</View>
			);
		}
		if (phase === QUESTION) {
			return (
				<View style={styles.formComponent}>
					<View style={{
						height: 21,
					}}>
						<Text style={styles.formFieldLabel}>Question</Text>
					</View>
					<View style={{
						marginTop: 4,
						marginBottom: 4,
					}}>
						<TextInput
							multiline
							numberOfLines={20}
							autoFocus
							onChangeText={this.updateCardQuestion}
							value={question}
						/>
					</View>
				</View>
			)
		}
	}

	getButtons = (phase) => {
		if (phase === QUESTION) {
			return (
				<Button
					style={styles.button}
					type='primary'
					onPress={() => this.showField(ANSWER)}
					>
					<Text>Next</Text>
				</Button>
			);
		}

		if (phase === ANSWER) {
			return (
				<React.Fragment>
					<Button
						style={styles.button}
						type='secondary'
						onPress={() => this.showField(QUESTION)}
						>
						<Text>Previous</Text>
					</Button>
					<Button
						style={styles.button}
						type='primary'
						onPress={() => this.props.onSave(this.state)}
						>
						<Text>Save</Text>
					</Button>
				</React.Fragment>
			);
		}
	}

	render() {
		const {phase} = this.state;

		return (
			<View style={styles.formContainer}>
				<View style={styles.formTitleContainer}>
					<Text style={styles.formTitle}>New Card</Text>
				</View>
				{this.getFieldView(phase)}
				<View style={styles.buttonRow}>
					{this.getButtons(phase)}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	formComponent: {
		marginBottom: 16,
		flex: 1,
	},
	formTitleContainer: {
		marginBottom: 32,
	},
	formContainer: {
		padding: 16,
		flex: 1,
	},
	formTitle: {
		fontWeight: '700',
		color: MAIN,
		fontSize: 40,
	},
	formFieldLabel: {
		fontWeight: '700',
		color: MAIN,
		fontSize: 18,
	},
	formTextInput: {
		backgroundColor: PRIMARY_L45,
		borderColor: MAIN_L74,
		borderWidth: 1,
		borderRadius: 2,
	},
	buttonRow: {
		marginBottom: 16,
	},
	button: {
		borderRadius: 4,
		margin: 16,
	},
});