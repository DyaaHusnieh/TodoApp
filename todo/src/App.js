import React from 'react';
import './style/index.css';
import { BrowserRouter, Route} from 'react-router-dom';
import Login from './pages/Login'
import TodoList from './pages/TodoList'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Route path='/' exact  component={ Login }/>
      <Route path="/TodoList/:userid" exact component={TodoList} />
    </div>
  </BrowserRouter>

  );
}

export default App;
