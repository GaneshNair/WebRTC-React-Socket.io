import React from 'react';
import SCBLogo from '../../../assets/images/scb.png';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import classes from './Logo.css';

const Logo = (props) => {
  return (
    <Aux>
      <div className={classes.Logo}>
        <img src={SCBLogo} alt="SCB"/>
      </div>
    </Aux>
  )
}

export default Logo;
