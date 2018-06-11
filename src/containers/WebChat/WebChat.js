import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import ConfigWindow from '../../components/ConfigWindow/ConfigWindow';
import ChatWindow from '../../components/ChatWindow/ChatWindow';
import VideoWindow from '../../components/VideoWindow/VideoWindow';
import classes from './WebChat.css';

class WebChat extends Component {
  state = {
    offerValue: '',
    answerValue: ''
  }
  changeStateFromConfig = (fromChild) => {
    console.log(fromChild, 'from child');
  }
  render(){
    console.log('WebChar.js Render')
    return (
      <Aux>
        <section className={classes.Section}>
          <ConfigWindow
            classes={classes.configWindow}
            offerValue={this.state.offerValue}
            answerValue={this.state.answerValue} />
          <VideoWindow classes={classes.videoWindow} />
          <ChatWindow classes={classes.chatWindow} />
        </section>
      </Aux>
    )
  }
}

export default WebChat;
