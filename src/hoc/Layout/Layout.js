import React, {Component} from 'react';
import Aux from '../Auxiliary/Auxiliary';
import HeaderNavigation from '../../components/HeaderNavigation/HeaderNavigation';

class Layout extends Component {
  render(){
    return (
      <Aux>
        <HeaderNavigation />
        <main>
          {this.props.children}
        </main>
      </Aux>
    )
  }
}

export default Layout;
