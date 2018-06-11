import React from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary'
import classes from './ChatWindow.css';

const ChatWindow = (props) => {
const articleClass = [classes.ChatWindow, props.classes].join(' ');
  return (
    <Aux>
      <article className={articleClass}>
        <div className={classes.chatWindow}>
            <div id="messages" className={classes.messages} ></div>
        </div>
        <input id="yourMessage" className={classes.yourMessage} type="text" placeholder="Message" />
        <button type="button" name="button" id="send" className={classes.chatSend} >SEND</button>
      </article>
    </Aux>
  )
}

export default ChatWindow;
