import React from 'react';
import {View, Text} from 'react-native';

export default class Header extends React.Component {
	render() {
		return (
			<View style={{
				flexDirection: 'row',
				height: 56,
				backgroundColor: '#272833',
				marginTop: 28,
				alignItems: 'center',
			}}>
				<View style={{
					flexDirection: 'row',
					flex: 1,
					backgroundColor: 'red',
				}}>
					<View style={{
						justifyContent: 'center',
						alignItems: 'center',
						height: 32,
						width: 32,
						alignSelf: 'flex-start',
						backgroundColor: 'purple',
					}}>
						<Text style={{
							color: 'white',
						}}>
							{'<'}
						</Text>
					</View>
				</View>
				<View style={{
					flex: 1,
					backgroundColor: 'blue',
				}}>
					<Text style={{
						fontSize: 18,
						color: 'white',
						fontWeight: '600',
					}}>
						Header
					</Text>
				</View>
				<View style={{
					flex: 1,
					backgroundColor: 'green',
				}}>

				</View>
			</View>
		);
	}
}