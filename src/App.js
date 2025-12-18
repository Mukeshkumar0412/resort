import React from 'react';
import {Route,Switch,BrowserRouter as Router} from 'react-router-dom';
import Home from './pages/Home';
import Room from './pages/Room';
import './App.css';
import SingleRoom from './pages/SingleRoom';
import Error from './pages/Error';
import Navbar from './components/navbar';
import ContactPage from './components/ContactPage';
function App() {
  return (
  <Router>
     <Navbar/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/rooms/" component={Room}/>
       <Route exact path="/rooms/:slug" component={SingleRoom}/>
       <Route path="/contact" component={ContactPage} />
      <Route component={Error}/>
     </Switch>
    </Router>
  );
}

export default App;
