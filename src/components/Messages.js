import React, { Component } from 'react';
import Message from './Message';

class Messages extends Component {
  render () {
    let messageList = this.props.messages.map( message => {
      return (
        <Message
          key={message.id}
          message={message}
          handleCheckBox={this.props.handleCheckBox}
          handleStarred={this.props.handleStarred}
          handleIndividualboxchange={this.props.handleIndividualboxchange}
        />
    )}
  );

    return (
      <div className='container'>
        {messageList}
      </div>
    );
  };
};

export default Messages;
