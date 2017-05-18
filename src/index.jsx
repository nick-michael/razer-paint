import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './reducers/rootReducer';
import App from './containers/App';

// Render to the #app element
ReactDOM.render(
    <Provider store={createStore(rootReducer)}>
        <App />
    </Provider>,
  document.getElementById('app'),
);
