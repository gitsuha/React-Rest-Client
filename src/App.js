import React, { Component } from 'react';
import './App.css';
import QuestionManager from './components/QuestionManager';
import Question from './components/Question';
import Choice from './components/Choice';
import { BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import Route from 'react-router-dom/Route';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/" exact component={QuestionManager} />
            <Route path="/questions/:id" exact component={Question} />
          </Switch>
        </div>
      </Router>
    )
  }
}