import React, { Component } from 'react';
import { Route } from 'react-router-dom'; 

import TracTable from './components/TracTable/TracTable';
import DetailedViewTable from './components/DetailedViewTable/DetailedViewTable';
import SimpleTable from './components/SimpleTable/SimpleTable';
import DetailedView from './components/DetailedViewTable/DetailedView';

class App extends Component {
  render() {
    return (
        <div>
          <Route path='/' exact component={SimpleTable}/>
          <Route path='/detailed-view-table' exact component={DetailedView}/>         
        </div>
    );
  }
}

export default App;
