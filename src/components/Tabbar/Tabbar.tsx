import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Profile from '../Profile/Profile';
import Calculator from '../Calculator/Calculator';
import Formulasheet from '../Formulasheet/Formulasheet';
import ChatApp from '../ChatApp/ChatApp';

export default function Tabbar() {
  const [index, setIndex] = useState(0);

  function setIndexOnNewMessage(indexNumber: number) {
    setIndex(indexNumber);
  }
  return (
    <Router>
      <div id="site-wrapper">
        <Switch>
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/calculator" component={Calculator} />
          <Route exact path="/formulasheet" component={Formulasheet} />
          <Route exact path="/chat">
            <ChatApp index={index} setIndex={setIndexOnNewMessage} />
          </Route>
        </Switch>
        <div id="tab-bar">
          <div>
            <Link to="/profile">
              <button>
                <img src="/icons/student-512.png" alt="profile"></img>
              </button>
            </Link>
          </div>
          <div>
            <Link to="/calculator">
              <button>
                <img src="/icons/calculator-5-512.png" alt="calculator"></img>
              </button>
            </Link>
          </div>
          <div>
            <Link to="/chat">
              <button>
                <img src="/icons/chat-4-512.png" alt="chat"></img>
              </button>
            </Link>
          </div>
          <div>
            <Link to="/formulasheet">
              <button>
                <img src="/icons/note-2-512.png" alt="formula sheet"></img>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Router>
  );
}
