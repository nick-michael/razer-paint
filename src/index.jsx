import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './reducers/rootReducer';
import App from './containers/App';

// Render to the #app element
 /* eslint-disable no-underscore-dangle */
ReactDOM.render(
    <Provider store={createStore(
        rootReducer,
        {},
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    )}
    >
        <App />
    </Provider>,
  document.getElementById('app'),
);
 /* eslint-enable no-underscore-dangle */
document.addEventListener('dragover', event => event.preventDefault());
document.addEventListener('drop', event => event.preventDefault());
