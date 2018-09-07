import React from 'react';
import {
	View,
	StyleSheet,
} from 'react-native';
import {
	WHITE,
	LIGHT,
} from '../foundation/Color';
import ViewOverflow from 'react-native-view-overflow';

export const Deck = ({filled}) => (
	<ViewOverflow style={{
		backgroundColor: 'pink',
		flex: 1,
	}}>
			{
				filled &&	repeat(nCards, (_, index) =>
						<View key={index}
								style={[
									styles.card,
									{
										position: 'absolute',
										left: x(index),
										top: y(index),
										backgroundColor: 'purple',
									}
								]}
						/>
				)
			}
			<View style={styles.card}>
				{this.children}
			</View>
	</ViewOverflow>
);

const repeat = (n, f) => Array(n).fill(0).map(f);
const position = (start, interval, i, n) => console.log(start + (n - i)*interval) || start + (n - i)*interval;
const nCards = 3;
const interval = 4;
const start = 0;
const x = i => position(start, interval, i, nCards);
const y = x;
const styles = StyleSheet.create({
	card: {
		width: 300,
		height: 400,
		borderRadius: 8,
		elevation: 15,
		backgroundColor: 'gold',
		borderColor: LIGHT,
		borderWidth: 1,
		padding: 16,
	}
});