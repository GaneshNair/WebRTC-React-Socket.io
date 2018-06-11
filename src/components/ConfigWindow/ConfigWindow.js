import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import openSocket from 'socket.io-client';
import classes from './ConfigWindow.css';

const  socket = openSocket('http://localhost:8000');

class ConfigWindow extends Component {
    constructor(props) {
      super(props);
    }
    state = {
      offerValue: 'no offer value yet',
      waiting: false
    }
    componentWillMount(){
        const locationHash = window.location.hash;
        const thisClass = this;
        console.log('componentWillMount called');
        navigator.webkitGetUserMedia({video: true}, function(stream){
        var Peer = require('simple-peer')
        var peer = new Peer({
          initiator:  locationHash === '#init',
          trickle: false,
          stream: stream
        })

        peer.on('signal', function(data){
          let signalData = JSON.stringify(data);
          document.getElementById('yourId').value = JSON.stringify(data)
          if(locationHash === '#init'){
            thisClass.startOffer(data);
          }
        })

        document.getElementById('initiate').addEventListener('click', function(){
          var otherId = JSON.parse(document.getElementById('otherId').value)
          peer.signal(otherId)
        })

        document.getElementById('send').addEventListener('click', function(){
          var yourMessage = document.getElementById('yourMessage').value;
          document.getElementById('yourMessage').value = '';
          peer.send(yourMessage);
          document.getElementById('messages').innerHTML += '<p><strong>' + 'You' + ': </strong>' + yourMessage + '</p>';
        })

        peer.on('data', function(data){
          document.getElementById('messages').innerHTML += '<p style="text-align:right; background-color:#dedede">'+ data +': <strong>' + 'Peer' + '</strong></p>';
        })

        peer.on('stream', function(stream){
          const video = document.createElement('video');
          document.getElementById('videoText').remove();
          document.getElementById('VideoWindow').appendChild(video)
          try {
            video.srcObject = stream;
          } catch (error) {
            video.src = window.URL.createObjectURL(stream);
          }
          video.play();
        })

      }, function(err){
        console.error(err)
      });

      socket.on('offerReady', function(data){ //step 2
          document.getElementById('otherId').value = data;
          if(data) {
            document.getElementById('initiate').click();
          }
      });

      socket.on('answerReady', function(ddata){ //step 4
        thisClass.handleAcceptAnswer(ddata);
      });

      socket.on('waiting', function(bool){ //step n
        thisClass.handleWaiting(bool);
      });

    }

    startOffer(data){ //step 1
      socket.emit('offerReady', JSON.stringify(data));
    }

    confirmInitiateion(){ //step 3
      var answerOffer = document.getElementById('yourId').value;
      socket.emit('answerReady', answerOffer);
    }

    handleAcceptAnswer(data){
      document.getElementById('otherId').value = data;
      if(data) {
        document.getElementById('initiate').click();
      }
    }

    shouldComponentUpdate(nextProps, nextState){
      console.log('shouldComponentUpdate called', nextProps, nextState)
      return true;
    }

    handleConnect = () => {
      this.confirmInitiateion();
    }

    handleWaiting = (bool) => {
      this.setState({waiting: bool});
    }

    render(){
      console.log('ConfigWindow.js Render', this.state.waiting);
      socket.on('offer', passedOffer => console.log(passedOffer));
      const articleClass = [classes.ConfigWindow, this.props.classes].join(' ');
      let chatOrshow = this.state.waiting ? <p className={classes.waitingText}>Waiting for other chats to end</p> : <button type="button" className={classes.connectBtn} id="connect" onClick={this.handleConnect}>Connect</button>;
      return(
        <Aux>
          <article className={articleClass}>
            <label className={classes.ownLabel} >Your Id: </label>
            <input className={classes.ownInput} id="yourId" />

            <label className={classes.otherLabel} >{window.location.hash === "#init" ? 'Customer address' : 'Agent\'s address' }</label>
            <input className={classes.otherInput} id="otherId" />
            <button type="button" className={classes.initiateBtn} id="initiate">Initiate</button>

            {chatOrshow}

          </article>
        </Aux>
      )
    }
}

export default ConfigWindow;
