import React from 'react';

import {
	StyleSheet,
	TouchableOpacity,
} from 'react-native';

import {
	WHITE,
	PRIMARY,
	MAIN_L65,
	MAIN_L28_D5,
	ERROR_L50,
	ERROR_L28,
	ERROR,
	SUCCESS,
	SUCCESS_L63,
	SUCCESS_L35,
} from '../foundation/Color';

export default class Button extends React.Component {
	render() {
		const {children, type} = this.props;
		return (
			<TouchableOpacity
				{...this.props}
				style={[styles.default, styles[type], this.props.style]}
			>
				{
					React.Children.map(children, child => (
						{
							...child,
							props: {
								...child.props,
								style: StyleSheet.flatten([styles[`${type}Content`], child.props.style]),
							},
						}
					))
				}
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	default: {
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 4,
		borderWidth: 1,
		paddingHorizontal: 15,
		paddingVertical: 9,
	},
	primary: {
		backgroundColor: PRIMARY,
		borderColor: PRIMARY,
	},
	primaryContent: {
		color: WHITE,
		fontWeight: '600',
	},
	secondary: {
		backgroundColor: WHITE,
		borderColor: MAIN_L65,
	},
	secondaryContent: {
		color: MAIN_L28_D5,
		fontWeight: '600',
	},
	success: {
		backgroundColor: SUCCESS_L63,
		borderColor: SUCCESS_L35,
	},
	successContent: {
		color: SUCCESS,
		fontWeight: '600',
	},
	error: {
		backgroundColor: ERROR_L50,
		borderColor: ERROR_L28,
	},
	errorContent: {
		color: ERROR,
		fontWeight: '600',
	}
});