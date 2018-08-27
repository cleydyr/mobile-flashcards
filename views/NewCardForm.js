import React from 'react';
import {
	View,
	Text,
	StyleSheet,
} from 'react-native';
import TextInput from '../components/lexicon/core/TextInput';

import { MAIN, PRIMARY_L45, PRIMARY_L23, MAIN_L74, WHITE } from '../components/lexicon/foundation/Color';
import Button from '../components/lexicon/core/Button';

export default class NewCardForm extends React.Component {
	constructor() {
		super();
		this.state = {
			question: '',
			answer: '',
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

	render() {
		const {question, answer} = this.state;

		return (
			<View style={styles.formContainer}>
				<View style={styles.formTitleContainer}>
					<Text style={styles.formTitle}>New Card</Text>
				</View>
				<View style={styles.formComponent}>
					<View style={{
						height: 21,
					}}>
						<Text style={styles.formFieldLabel}>Question</Text>
					</View>
					<View style={{
						height: 40,
						marginTop: 4,
						marginBottom: 4,
					}}>
						<TextInput
							onChangeText={this.updateCardQuestion}
							value={question}
						/>
					</View>
				</View>
				<View style={styles.formComponent}>
					<View style={{
						height: 21,
					}}>
						<Text style={styles.formFieldLabel}>Answer</Text>
					</View>
					<View style={{
						height: 40,
						marginTop: 4,
						marginBottom: 4,
					}}>
						<TextInput
							onChangeText={this.updateCardAnswer}
							value={answer}
						/>
					</View>
				</View>
				<View style={styles.buttonRow}>
					<Button
						type='secondary'
						style={{
							marginRight: 16,
						}}
						onPress={this.props.onCancel}
					>
						<Text>Cancel</Text>
					</Button>
					<Button
						type='primary'
						onPress={() => this.props.onSave({question, answer})}
						>
						<Text>Save</Text>
					</Button>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	formComponent: {
		marginBottom: 16,
	},
	formTitleContainer: {
		marginBottom: 32,
	},
	formContainer: {
		padding: 16,
	},
	formTitle: {
		fontWeight: '700',
		color: MAIN,
		fontSize: 20,
	},
	formFieldLabel: {
		fontWeight: '700',
		color: MAIN,
	},
	formTextInput: {
		height: 40,
		backgroundColor: PRIMARY_L45,
		borderColor: MAIN_L74,
		borderWidth: 1,
		borderRadius: 2,
	},
	buttonRow: {
		marginBottom: 16,
		flexDirection: 'row',
	},
});