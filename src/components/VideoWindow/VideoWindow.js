import React from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import classes from './VideoWindow.css';

const VideoWindow = (props) => {
  return (
    <Aux>
      <article className={props.classes} id="VideoWindow">
        <p id="videoText">Video loads here</p>
      </article>
    </Aux>
  )
}

export default VideoWindow;
