import React from 'react';
import StackedViews from './views/StackedViews';
import { setLocalNotification } from './api/NotificationService';

export default class App extends React.Component {
	componentDidMount() {
		setLocalNotification();
	}

  render() {
    return (
			<StackedViews />
    );
  }
}
