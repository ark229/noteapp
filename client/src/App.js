import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NoteList from './components/NoteList';
import CreateNote from './components/CreateNote';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={NoteList} />
          <Route path="/create" component={CreateNote} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
