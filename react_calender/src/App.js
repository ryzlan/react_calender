import React, { Component } from 'react';

import Calender from './component/Calender';

class App extends Component {
  render() {
    return (
      <div className="App">
      <header>
        <div id="logo">
          <span>
            react<b>calendar</b>
          </span>
        </div>
      </header>
      <main>
        <Calender />
      </main>
    </div>
    );
  }
}

export default App;
