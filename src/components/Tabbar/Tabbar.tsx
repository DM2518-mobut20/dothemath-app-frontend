import React from 'react';
import { Router, Route, Link, Switch } from 'react-router-dom';
import Profile from '../Profile/Profile';
import { ChatApp } from '../ChatApp/ChatApp';
import { useCookie } from '../../useCookie';
import history from './history';
import { ErrorBoundary } from '../ErrorBoundary';

export const Tabbar = () => {
  const [name, setName] = useCookie('name');
  const [index, setIndex] = useCookie('index');

  const [threadId, setThreadId] = useCookie('threadId');
  const [channelId, setChannelId] = useCookie('channelId');
  const [allChatsArray, setAllChatsArray] = useCookie('allChatsArray');
  const [currentAvatar, setCurrentAvatar] = useCookie('currentAvatar');

  const goToChat = (itemIndex) => {
    setThreadId(allChatsArray[itemIndex].threadId);
    setChannelId(allChatsArray[itemIndex].channelId);
    setIndex(itemIndex);
    history.push('/');
  };
  const changeAvatar = (avatarImgUrl) => setCurrentAvatar(avatarImgUrl);
  return (
    <ErrorBoundary>
      <Router history={history}>
        <div id="site-wrapper">
          <Switch>
            <Route exact path="/profile">
              <Profile
                goToChat={goToChat}
                allChatsArray={allChatsArray}
                index={index}
                currentAvatar={currentAvatar}
                changeAvatar={changeAvatar}
                name={name}
              />
            </Route>
            <Route exact path="/">
              <ChatApp
                index={index}
                setIndex={setIndex}
                threadId={threadId}
                setThreadId={setThreadId}
                channelId={channelId}
                setChannelId={setChannelId}
                allChatsArray={allChatsArray}
                setAllChatsArray={setAllChatsArray}
                name={name}
                setName={setName}
              />
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
              <Link to="/">
                <button>
                  <img src="/icons/chat-4-512.png" alt="chat"></img>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Router>
    </ErrorBoundary>
  );
};
