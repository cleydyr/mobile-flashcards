import React from 'react';
import {
	View,
	Text,
	CheckBox,
	StyleSheet,
} from 'react-native';
import {
	WHITE,
	MAIN,
	MAIN_L28_D5,
	PRIMARY_L45,
} from '../foundation/Color';

export default class ListItem extends React.Component {
	render() {
		const {title, description, active, onValueChange} = this.props;

		return (
			<View style={[styles.listGroupItem, active && {backgroundColor: PRIMARY_L45}]}>
				<View style={styles.autoFitCol}>
					<View style={styles.customControl}>
						<CheckBox
							onValueChange={onValueChange}
							value={active}
							hitSlop={{top: 4, bottom: 4, left: 4, right: 4}}
						/>
					</View>
				</View>
				<View style={[styles.autoFitCol, styles.autoFitColExpand]}>
						<Text numberOfLines={1} style={styles.titleText}>{title}</Text>
						{description && <Text numberOfLines={1} style={styles.secondaryText}>{description}</Text>}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	listGroupItem: {
		paddingLeft: 8,
		paddingRight: 8,
		paddingTop: 16,
		paddingBottom: 16,
		flexDirection: 'row',
		backgroundColor: WHITE,
		borderWidth: 1,
		borderColor: 'rgba(219, 219, 219, 0.5)',
		borderStyle: 'solid',
	},
	autoFitCol: {
		paddingLeft: 8,
		paddingRight: 8,
	},
	autoFitColExpand: {
		flex: 1,
	},
	customControl: {
		marginBottom: 0,
		marginTop: 1,
	},
	titleText: {
		fontSize: 14,
		color: MAIN,
		fontWeight: '600',
		lineHeight: 20.3,
		marginBottom: 0,
	},
	secondaryText: {
		color: MAIN_L28_D5,
	},
});