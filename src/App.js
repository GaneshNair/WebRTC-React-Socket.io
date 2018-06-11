import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import WebChat from './containers/WebChat/WebChat';
import './App.css';

class App extends Component {
  render() {
    return (
      <Layout>
        <WebChat />
      </Layout>
    );
  }
}

export default App;
