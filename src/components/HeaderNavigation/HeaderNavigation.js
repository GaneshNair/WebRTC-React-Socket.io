import React from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Logo from './Logo/Logo';
import classes from './HeaderNavigation.css';

const HeaderNavigation = (props) => {
  return (
    <Aux>
      <header className={classes.MainHeader}>
        <Logo />
        <h2 className={classes.heading}>Standard Chartered Bank Webchat</h2>
      </header>
    </Aux>
  )
}

export default HeaderNavigation;
