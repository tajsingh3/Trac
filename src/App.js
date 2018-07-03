import React, { Component } from 'react';
import { Route } from 'react-router-dom'; 

import TracTable from './components/TracTable/TracTable';
import DetailedViewTable from './components/DetailedViewTable/DetailedViewTable';
import SimpleTable from './components/SimpleTable/SimpleTable';

class App extends Component {
  render() {
    return (
        <div>
          <Route path='/' exact component={TracTable}/>
          <Route path='/detailed-view-table' exact component={DetailedViewTable}/>      
          <Route path='/simple' exact component={SimpleTable}/>      
        </div>
    );
  }
}

export default App;
