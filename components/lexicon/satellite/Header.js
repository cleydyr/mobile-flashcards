import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icons from '../core/Icons';

const iconSize = 18;
const fillColor = 'white';

export default class Header extends React.Component {
	LeftContainer = ({leftButtons}) => (
		<View style={{
			flexDirection: 'row',
			flex: 1,
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
	)

	CenterContainer = ({title, subtitle}) => (
		<View style={{
			alignItems: 'center',
			justifyContent: 'center',
			height: 27,
			flex: 1,
		}}>
			<Text
				style={{
					fontSize: 18,
					color: fillColor,
					fontWeight: '600',
				}}
				numberOfLines={1}
			>
				{title}
			</Text>
			{
				subtitle &&
					<Text
						style={{
							fontSize: 14,
							color: fillColor,
						}}
						numberOfLines={1}
					>
						{subtitle}
					</Text>
			}
		</View>
	)

	RightContainer = ({rightButtons}) => (
		<View style={{
			flexDirection: 'row',
			flex: 1,
			justifyContent: 'flex-end',
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
	)

	render() {

		return (
			<View style={{
				flexDirection: 'row',
				height: 56,
				backgroundColor: '#272833',
				alignItems: 'center',
			}}>
				<this.LeftContainer
					{...this.props}
				/>

				<this.CenterContainer
					{...this.props}
				/>

				<this.RightContainer
					{...this.props}
				/>
			</View>
		);
	}
}