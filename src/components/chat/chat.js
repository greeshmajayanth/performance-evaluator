import React, { Component } from 'react';
import { withRouter } from '../../withRouter.js';

class ChatComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ws: null,
      messages: [],
      messageBoxValue: ''
    };
  }

  componentDidMount() {
    this.initWebSocket();
    this.messageBox = document.getElementById('messageBox');
  }

  componentWillUnmount() {
    const { ws } = this.state;
    if (ws) {
      ws.close();
    }
  }

  initWebSocket = () => {
    const { ws } = this.state;

    if (ws) {
      ws.onerror = ws.onopen = ws.onclose = null;
      ws.close();
    }

    const newWs = new WebSocket('ws://localhost:8000');
    newWs.onopen = () => {
      console.log('Connection opened!');
    };
    newWs.onmessage = ({ data }) => this.setState((prevState) => ({
        messages: [...this.state.messages, data],
        messageBoxValue: '',
      }));
    newWs.onclose = () => {
      this.setState({ ws: null });
    };

    this.setState({ ws: newWs });
  };

  sendMessage = () => {
    const { ws, messageBoxValue } = this.state;

    if (!ws) {
      this.setState({ messages: ["No WebSocket connection :("] });
      return;
    }

    ws.send(messageBoxValue);

    // Use the callback form of setState to ensure state updates are applied correctly
    // this.setState((prevState) => ({
    //   messageBoxValue: ''
    // }));

    // Check if messageBox is available before trying to set its value
    if (this.messageBox) {
      this.messageBox.value = '';
    }
  };

  render() {
    const { messages, messageBoxValue } = this.state;

    return (
      <div>
        <pre id="messages">
          {messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </pre>
        <input
          type="text"
          id="messageBox"
          placeholder="Type your message here"
          value={messageBoxValue}
          onChange={(e) => this.setState({ messageBoxValue: e.target.value })}
        />
        <button id="send" title="Send Message" onClick={this.sendMessage}>
          Send Message
        </button>
      </div>
    );
  }
}

export default withRouter(ChatComponent);
