import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icons from '../core/Icons';

export default class Header extends React.Component {
	render() {
		const {title, leftButtons, rightButtons} = this.props;
		const iconSize = 18;
		const fillColor = 'white';

		return (
			<View style={{
				flexDirection: 'row',
				height: 56,
				backgroundColor: '#272833',
				alignItems: 'center',
				//Header container
			}}>
				<View style={{
					flexDirection: 'row',
					flex: 1,
					//Left
				}}>
					{
						leftButtons && leftButtons.map((button, index) => (
							<TouchableOpacity key={index} onPress={button.onPress}>
								<View style={{
									justifyContent: 'center',
									alignItems: 'center',
									height: 32,
									width: 32,
									marginRight: 16,
								}}>
									<Icons
										id={button.icon}
										size={iconSize}
										fill={fillColor}
									/>
								</View>
							</TouchableOpacity>
						))
					}

				</View>

				<View style={{
					alignItems: 'center',
					justifyContent: 'center',
					height: 27,
					flex: 1,
					//center
				}}>
					<Text style={{
						fontSize: 18,
						color: fillColor,
						fontWeight: '600',
					}}>
						{title}
					</Text>
				</View>

				<View style={{
					flexDirection: 'row',
					flex: 1,
					justifyContent: 'flex-end',
					//right
				}}>
					{
						rightButtons && rightButtons.map((button, index) => (
							<TouchableOpacity key={index} onPress={button.onPress}>
								<View style={{
									justifyContent: 'center',
									alignItems: 'center',
									height: 32,
									width: 32,
									flexDirection: 'row',
									marginLeft: 16,
								}}>
									<Icons
										size={iconSize}
										fill={fillColor}
										id={button.icon}
									/>
								</View>
							</TouchableOpacity>
						))
					}
			</View>
		</View>
		);
	}
}