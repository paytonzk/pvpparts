import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1 className="header1">PVP Parts and Service</h1>
        </div>
        <div className="App-tabs">
          <form className="tab-pages">
            <ul>
              <li><button className="button">Home</button></li>
              <li><button className="button">About Us</button></li>
              <li><button className="button">Inventory</button></li>
              <li><button className="button">FAQ</button></li>
            </ul>
          </form>
          </div>
        
      </div>
    );
  }
}

export default App;
