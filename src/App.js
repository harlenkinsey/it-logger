import React from "react";
import './App.css';

import Header from "./app/Header";
import { View } from "./features/view/View";

import store from './app/store';
import { Provider } from 'react-redux';

function App() {
  
  return (
    <Provider store={store}>
      <React.Fragment>
        
        <Header></Header>
        
        <View></View>
        
      </React.Fragment>
    </Provider>
  );
}

export default App;
