import React from 'react';
import {
	View,
	TouchableOpacity,
	StyleSheet,
	CheckBox,
	TextInput,
} from 'react-native';
import Icons from '../Icons';
import {WHITE, PRIMARY, MAIN} from '../../foundation/Color'

const flexDirection = 'row';
const flex = 1;
const iconSize = 18;
const backgroundColor = WHITE;
const alignItems = 'center';
const justifyContent = 'center';

export default class ManagementToolbar extends React.Component {
	constructor() {
		super();
		this.state = {
			ToolbarContent: this.DefaultToolbarContent,
			searchText: '',
		}
		this.cachedContent = [];
	}

	SearchToolbarContent = () => (
		<React.Fragment>
			<TextInput
				style={{
					flex: 1,
					height: 40,
					backgroundColor: '#F0F5FF',
				}}
				underlineColorAndroid='#F0F5FF'
				onChangeText={this.updateSearchText}
				value={this.state.searchText}
				autoFocus={true}
			/>
			<View style={{
				backgroundColor: '#F0F5FF',
				height: 40,
				justifyContent,
				paddingRight: 8,
			}}>
				<TouchableOpacity
						onPress={this.clearSearchText}
				>
					<Icons
								fill='#6B6C7E'
								id='times'
								size={16}
							/>
				</TouchableOpacity>
			</View>
		</React.Fragment>
	);

	DefaultToolbarContent = () => (
		<React.Fragment>
			<View style={{
					flexDirection,
					flex,
					paddingLeft: 8,
					//Left
				}}>
					<View style={styles.leftButton}>
						<CheckBox/>
					</View>
					<View style={styles.leftButton}>
						<TouchableOpacity>
							<Icons
								fill={MAIN}
								id='filter'
								size={iconSize}
							/>
						</TouchableOpacity>
					</View>
					<View style={styles.leftButton}>
						<TouchableOpacity>
							<Icons
								fill={MAIN}
								id='order-arrow'
								size={iconSize}
							/>
						</TouchableOpacity>
					</View>
				</View>

				<View style={{
					flexDirection,
					flex,
					justifyContent: 'flex-end',
					paddingRight: 8,
					//right
				}}>
					<View style={styles.rightButton}>
						<TouchableOpacity
								onPress={this.showSearchToolbarContent}
						>
							<Icons
								fill={MAIN}
								id='search'
								size={iconSize}
							/>
						</TouchableOpacity>
					</View>
					<View style={[styles.rightButton, {backgroundColor: PRIMARY}]}>
						<TouchableOpacity>
								<Icons
									fill={WHITE}
									id='plus'
									size={iconSize}
								/>
						</TouchableOpacity>
					</View>
			</View>
		</React.Fragment>
	);

	showSearchToolbarContent = () => {
		if (!this.cachedContent['searchToolbar']) {
			this.cachedContent['searchToolbar'] = <this.SearchToolbarContent />;
		}
		this.setState({
			ToolbarContent: () => this.cachedContent['searchToolbar'],
		});
	}

	showDefaultToolbarContent = () => {
		if (!this.cachedContent['defaultToolbar']) {
			this.cachedContent['defaultToolbar'] = <this.DefaultToolbarContent />;
		}

		this.setState({
			ToolbarContent: () => this.cachedContent['defaultToolbar'],
		});
	}

	updateSearchText = searchText => {
		this.setState({
			searchText,
		});
	}

	clearSearchText = () => {
		this.updateSearchText('');
		this.showDefaultToolbarContent();
	}

	render() {
		const {ToolbarContent} = this.state;
		return (
			<View style={{
				backgroundColor,
				flexDirection,
				height: 64,
				alignItems,
				//Header container
				paddingLeft: 8,
				paddingRight: 8,
			}}>
				<ToolbarContent />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	leftButton: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 32,
		width: 32,
		marginRight: 16,
	},
	rightButton: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 32,
		width: 32,
		marginLeft: 16,
		borderRadius: 4,
	},
})