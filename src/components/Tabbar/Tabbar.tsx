import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Profile from '../Profile/Profile';

export default function Tabbar() {
  return (
    <Router>
      <div id="site-wrapper">
        <Switch>
          <Route exact path="/profile" component={Profile}></Route>
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
              <img src="/icons/calculator-5-512.png" alt="profile"></img>
            </button>
          </div>
          <div>
            <button>
              <img src="/icons/chat-4-512.png" alt="profile"></img>
            </button>
          </div>
          <div>
            <button>
              <img src="/icons/note-2-512.png" alt="profile"></img>
            </button>
          </div>
        </div>
      </div>
    </Router>
  );
}
