import React from 'react';
import {
	View,
	ActivityIndicator,
	Modal,
} from 'react-native';
import { MAIN } from './lexicon/foundation/Color';

export default ActivityIndicatorModal = ({loading}) => (
	<Modal
		animationType="fade"
		transparent={true}
		visible={loading}
		onRequestClose={() => {}}
	>
		<View style={{
			justifyContent: 'center',
			alignItems: 'center',
			flex: 1,
		}}>
			<ActivityIndicator
				size='large'
				color={MAIN}
			/>
		</View>
	</Modal>
);