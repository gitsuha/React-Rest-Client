import React, { Component } from 'react';

class Choice extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      choice: "",
      votes: 0,
      url: ""
    };
  }

  async componentDidMount() {
    const url = "https://polls.apiblueprint.org" + this.props.choiceUrl;
    // console.log(url);
    const resp = await fetch(url);
    const data = await resp.json();
    //console.log(data);
    this.setState({ choice: data.choice, votes: data.votes, loading: false });
  }

  render() {

    if (this.state.loading) {
      return <div>loading...</div>;
    }

    if (this.state.questionId == 0) {
      return <div>Choice data not available...</div>
    }
    var votes = parseInt(this.state.votes);
    var percentage = (votes / this.props.totalVotes) * 100;
    // console.log(percentage);

    return (
      <tr>
        <td>{this.state.choice}</td>
        <td>{this.state.votes}</td>
        <td>{percentage}%</td>
      </tr>
    )
  }
}

export default Choice;