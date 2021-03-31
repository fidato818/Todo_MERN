import React from 'react';
import './bootstrap.min.css';

import Navbar from './routes'
// import Home from './components/User/Home'
import './App.css';
 
import { store, persistor } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
 
function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Navbar />
            </PersistGate>
        </Provider>
    );
}

export default App;