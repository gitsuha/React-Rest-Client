import React, { Component } from 'react'

class CreateQuestion extends Component {
  constructor(props) {
    super(props)

    this.state = {
      question: '',
      choices: '',
    };
  }

  async PostQuestion() {
    var choices = this.state.choices.split(',');
    const response = await fetch('https://polls.apiblueprint.org/questions?page=1', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "question": this.state.question,
        "choices": choices
      })
    });
    return await response.json();
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitHandler = e => {
    e.preventDefault()
    console.log(this.state);
    try {
      this.PostQuestion()
    } catch (e) {
      console.log(e)
    }
    this.render()
  }

  render() {
    const { question, choices } = this.state
    return (
      <div>
        <h1>Create new question:</h1>
        <form onSubmit={this.submitHandler.bind(this)}>
          <div>
            <label>Question </label>
            <input
              type="text"
              name="question"
              value={question}
              onChange={this.changeHandler}
            />
          </div>
          <div>
            <label>Choices </label>
            <input
              type="text"
              name="choices"
              value={choices}
              onChange={this.changeHandler}
            />
            <label> (input choices with ',' separated)</label>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default CreateQuestion