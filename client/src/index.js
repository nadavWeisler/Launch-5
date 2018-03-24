import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './appRouter';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';

//const store = createStore(() => (reducers, {}, applyMiddleware(reduxThunk)));
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store}><AppRouter/></Provider>, 
    document.getElementById('root')
);
