import React, { Component } from 'react';
import Choice from './Choice';
import './Choices.css';

class Question extends Component {

  constructor(props, match) {
    super(props);

    // console.log(props.match);

    this.state = {
      loading: true,
      questionId: props.match.params.id,
      question: "",
      choices: []
    };

  }

  async componentDidMount() {
    const url = "https://polls.apiblueprint.org/questions/" + this.state.questionId;
    // console.log(url);
    const resp = await fetch(url);
    const data = await resp.json();
    // console.log(data);
    this.setState({
      question: data.question,
      choices: data.choices,
      loading: false
    });
    // console.log(this.state.choices);
  }

  render() {

    if (this.state.loading) {
      return <div>loading...</div>;
    }

    if (!this.state.choices.length) {
      return <div>No questions available</div>
    }

    var total = 0;
    var x;
    for (x in this.state.choices) {
      total += parseInt(this.state.choices[x].votes);
    }

    return (
      <div>
        <h1>Question Detail</h1>
        <h2>Question {this.state.questionId}: {this.state.question}</h2>
        <div>
          <table id="choices">
            <tr>
              <th>Choice</th>
              <th>Votes</th>
              <th>%</th>
            </tr>
            {this.state.choices.map(choice => (
              <Choice choiceUrl={choice.url} totalVotes={total}></Choice>
            ))}
          </table>
        </div>
      </div>
    )
  }
}

export default Question;