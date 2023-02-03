import React from 'react';
import './App.css';

import Footer from './app/Footer';
import { View } from './features/view/View';
import store from './app/store';
import { Provider } from 'react-redux';
import { TicketCard } from './features/tickets/TicketCard';

function App() {
  
  return (
    <Provider store={store}>
      <React.Fragment>
        
        <Footer />
        
        <View />
        
      </React.Fragment>
    </Provider>
  );
}

export default App;
