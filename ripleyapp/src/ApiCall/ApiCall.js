import React, {Component} from 'react';
//import {Link} from 'react-router-dom';
import axios from 'axios';

const URL = 'wss://afternoon-island-44333.herokuapp.com/'
//const URL = 'ws://localhost:4000/'

class ApiCall extends Component {
  constructor(props) {
    super(props);

    this.state = {
      temperature: null,
      time:null,
      zone:null,
    };
  }

  ws = new WebSocket(URL)

  async loadConstruction( id ) {
    const results = (await axios.get('https://afternoon-island-44333.herokuapp.com/'+id)).data;
    this.setState({
        temperature : results.body.currently.temperature,
        time : this.convertTimestamp(results.body.currently.time),
        zone : results.body.timezone,
    });
    if (id) {
      this.submitMessage(id);
    }
  }

  convertTimestamp(tim) {
    var timestampField = tim;
    var timestampValue = parseInt(timestampField);

      var dt = new Date(timestampValue*1000);
      return dt.toUTCString();

    
  }

  componentWillReceiveProps(nextProps) {
    
    if (nextProps.match.params.id !== this.props.match.params.id) {
      const id = nextProps.match.params.id
      this.loadConstruction( id );
    }
  }

  componentDidMount() {
      const { match: { params } } = this.props;
      const ids = params.id;
      this.ws.onopen = () => {
        // on connecting, do nothing but log it to the console
        console.log('connected to ws')        
      }

      this.loadConstruction(ids)
      
      this.ws.onclose = () => {
        console.log('disconnected')
        // automatically try to reconnect on connection loss
        this.setState({
          ws: new WebSocket(URL),
        })
      }
      this.ws.onmessage = evt => {
        // on receiving a message, add it to the list of messages
        const message = JSON.parse(evt.data);
        console.log(evt.data)
        //this.addMessage(message)
        this.setState({
          temperature : message.temperature,
          time : this.convertTimestamp(message.time),
        });
        
     

    }
    
  }

  submitMessage(message) {
    clearInterval(this.interval);
    this.interval = setInterval(() => 
      this.ws.send(message)
    , 10000);
    
  }

  render() {
    return (
      <div className="container">
        <div className="row">
    
        {this.state.results === null && <p>Please first select a country zone...</p>}
        <div className="card text-white bg-success mb-12">
          <div className="card-header">Temperatura y hora</div>
          <div className="card-body">
              <h4 className="card-title">{this.state.zone}</h4>
              <p className="card-text">Temperatura: {this.state.temperature} <br></br>
                                        {this.state.time}   </p>
            
            </div>
            
          </div>
        </div>
      </div>
    )
  }

  
}




export default ApiCall;