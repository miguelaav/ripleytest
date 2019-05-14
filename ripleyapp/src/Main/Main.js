import React, {Component} from 'react';

class ApiCall extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
    };
  }

  async componentDidMount() {
    const results = null;
    this.setState({ results });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
        {this.state.results === null && <p>Please first select a country zone...</p>}
        
        </div>
      </div>
    )
  }
}

export default ApiCall;