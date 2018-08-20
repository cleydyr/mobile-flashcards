import React from 'react';
import {
	TextInput as RNTextInput,
	StyleSheet,
} from 'react-native';
import {
	PRIMARY_L45,
	MAIN_L74,
	LIGHT,
	PRIMARY_L23,
	MAIN,
} from '../foundation/Color';

export default class TextInput extends React.Component {
	constructor() {
		super();
		this.state = {
			style: styles.textInputDefault,
		}
	}
	makeActive = () => {
		this.setState({style: styles.textInputActive});
	}

	makeDefault = () => {
		this.setState({style: styles.textInputDefault});
	}

	render() {
		return (
			<RNTextInput
				{...this.props}
				style={[styles.textInput, this.state.style]}
				onBlur={this.makeDefault}
				onFocus={this.makeActive}
				underlineColorAndroid={PRIMARY_L45}
			/>
		);
	}
}

const styles = StyleSheet.create({
	textInput: {
		height: 40,
		borderWidth: 1,
		borderRadius: 2,
	},
	textInputDefault: {
		backgroundColor: LIGHT,
		borderColor: MAIN_L74,
	},
	textInputActive: {
		backgroundColor: PRIMARY_L45,
		borderColor: PRIMARY_L23,
		color: MAIN,
	}
});