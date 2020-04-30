import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Profile from '../Profile/Profile';
import Calculator from '../Calculator/Calculator';
import Formulasheet from '../Formulasheet/Formulasheet';
import App from '../../App';

export default function Tabbar() {
  return (
    <Router>
      <div id="site-wrapper">
        <Switch>
          <Route exact path="/profile" component={Profile}></Route>
          <Route exact path="/calculator" component={Calculator}></Route>
          <Route exact path="/formulasheet" component={Formulasheet}></Route>
          <Route exact path="/chat" component={App}></Route>
        </Switch>
        <div id="tab-bar">
          <div>
            <button>
              <Link to="/profile">
                <img src="/icons/student-512.png" alt="profile"></img>
              </Link>
            </button>
          </div>
          <div>
            <button>
              <Link to="/calculator">
                <img src="/icons/calculator-5-512.png" alt="profile"></img>
              </Link>
            </button>
          </div>
          <div>
            <button>
              <Link to="/chat">
                <img src="/icons/chat-4-512.png" alt="profile"></img>
              </Link>
            </button>
          </div>
          <div>
            <button>
              <Link to="/formulasheet">
                <img src="/icons/note-2-512.png" alt="profile"></img>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </Router>
  );
}
