import React from "react";
import './App.css';

import Footer from "./app/Footer";
import { View } from "./features/view/View";

import { ActionButton } from "./features/modal/ActionButton";

import store from './app/store';
import { Provider } from 'react-redux';

function App() {
  
  return (
    <Provider store={store}>
      <React.Fragment>
        
        <Footer />
        
        <View />

        <ActionButton />
        
      </React.Fragment>
    </Provider>
  );
}

export default App;
