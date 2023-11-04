import React, { Component } from 'react'
import '../chat.css';
import { connect } from 'react-redux';
import io from 'socket.io-client';

class Chat extends Component {
  constructor(props){
    super(props);
    console.log("Propsssss", props);

    this.state = {
        messages : [], // {content : 'some message', self : true}
        typedMessage : '',
    };

    // this.socket = io.connect('http://54.237.158.65:5000');
    this.socket = io.connect('http://localhost:5000');
    console.log("IO ", io.connect);
    // this.socket = io.connect('http://127.0.0.1:5000');
  
    this.userEmail = props.user.email; //This is the mail of the user on the behalf of which messages are sent to clients

    if(this.userEmail){
      console.log(this.userEmail);
      this.setupConnections();
    }
  }

  setupConnections = () => {
    const socketConnection = this.socket;
    console.log("socketConnection ", socketConnection);
    // we are doing this bcz when socket.js starts then value of this doesn't points to our present class
    const self = this;

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    this.socket.on('connect', function () {
      // this will be consoled when connction is established
      console.log('CONNECTION ESTABLISHED');

      // This call back is called when connction is established
      // By this fn we are sending the action
      socketConnection.emit('joined_room', {
        user_email : self.userEmail,
        chatroom : 'codeial'
      });

      // this.socket.on('connect_error', (error) => {
      //   console.error('Connection error:', error);
      // });      

      socketConnection.on('user_joined', function (data) {
        console.log('NEW USER JOINED', data);
      });
    });

    this.socket.on('receive_message', function (data) {
      const {messages} = self.state;
      const messageObject = {};
      messageObject.content = data.message;
      console.log(data);
      console.log(messages);

      if (data.user_email === self.userEmail) {
        messageObject.self = true;
      }

      self.setState({
        messages : [...messages, messageObject],
        typedMessage : ''
      });
    });

  //this.setupConnections = this.setupConnections.bind(this);

  };

  handleSubmit = () => {
    const {typedMessage} = this.state;

    if(typedMessage && this.userEmail){
      this.socket.emit('send_message', {
        message : typedMessage,
        user_email : this.userEmail,
        chatroom : 'codeial',
      });
    }
  }
  render() {
    const {typedMessage, messages} = this.state;
    return (
      <div className='chat-container'>
        <div className='chat-header'>
            Chat
            <img
                src='data:image/png;base64,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'
                alt=''
                height={17}
            />
        </div>
        <div className='chat-messages'>
            {messages.map((message) => (
                <div className={
                    message.self ? 
                    'chat-bubble self-chat' :
                    'chat-bubble other-chat'
                }>
                {message.content}
                </div>
            ))}
        </div>
        <div className='chat-footer'>
            <input
             type='text'
             value={typedMessage}
             onChange={(e) => this.setState({ typedMessage : e.target.value })}
            />
            <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps({auth}) {
  return {
    user : auth.user,
  };
}

export default connect(mapStateToProps)(Chat);

