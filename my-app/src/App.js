import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import WelcomeScreen from './screens/WelcomeScreen';
import SeatHallScreen from './screens/SeatHallScreen';
import SummaryScreen from './screens/SummaryScreen';


function App() {

  return (<div>
    <Switch>
      <Route path="/" exact component={WelcomeScreen} />
      <Route path="/hall" exact component={SeatHallScreen} />
      <Route path="/summary" exact component={SummaryScreen} />
    </Switch>
    </div>
  );
}

export default App;
