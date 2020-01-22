import React, { Component } from 'react';
import Choice from './Choice';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Question from './Question';
import CreateQuestion from './CreateQuestion';

class QuestionManager extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      page: 1,
      questions: []
    };
  }

  async fetchQuestionList() {
    console.log("componentDidMount");
    const url = "https://polls.apiblueprint.org/questions?page=" + this.state.page;
    const resp = await fetch(url);
    const data = await resp.json();
    this.setState({ questions: data, loading: false })
  }

  async componentDidMount() {
    this.fetchQuestionList();
    this.timer = setInterval(() => this.fetchQuestionList(), 5000);
  }

  render() {

    if (this.state.loading) {
      return <div>loading...</div>;
    }

    if (!this.state.questions.length) {
      return <div>No questions available</div>
    }

    console.log("render");
    return (
      <div>
        <CreateQuestion></CreateQuestion>
        <h1>Questions</h1>
        <div class="question-container">
          {this.state.questions.map(question => (
            <div key={question.url} class="question">
              <Link to={question.url}><div>{question.question}</div></Link>
              <div class="details">Published at: {question.published_at}</div>
              <div class="details">Number of choices: {question.choices.length}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default QuestionManager;