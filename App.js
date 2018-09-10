import React from 'react';
import StackedViews from './views/StackedViews';
import { setLocalNotification } from './api/NotificationService';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';

const store = createStore(
	reducer,
	compose(
		applyMiddleware(thunk)
	)
);

export default class App extends React.Component {
	componentDidMount() {
		setLocalNotification();
	}

  render() {
    return (
			<Provider store={store}>
				<StackedViews />
			</Provider>
    );
  }
}
