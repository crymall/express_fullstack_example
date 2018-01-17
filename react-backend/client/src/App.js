import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import './App.css';
import Users from './users/users'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Route path='/users' component={Users} />
      </div>
    );
  }
}

export default App;
