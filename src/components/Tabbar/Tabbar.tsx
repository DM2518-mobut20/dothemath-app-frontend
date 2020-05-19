import React from 'react';
import { Router, Route, Link, Switch } from 'react-router-dom';
import Profile from '../Profile/Profile';
import ChatApp from '../ChatApp/ChatApp';
import { useCookie } from '../../useCookie';
import history from './history';
import { ErrorBoundary } from '../ErrorBoundary';

export function Tabbar() {
  const [index, setIndex] = useCookie('index');
  function setIndexOnNewMessage(indexNumber: number) {
    setIndex(indexNumber);
  }
  const [threadId, setThreadId] = useCookie('threadId');
  const setThreadIdChild = (threadIdChild) => setThreadId(threadIdChild);
  const [channelId, setChannelId] = useCookie('channelId');
  const setChannelIdChild = (channelIdChild) => setChannelId(channelIdChild);
  const [allChatsArray, setAllChatsArray] = useCookie('allChatsArray');
  const setAllChatsArrayChild = (allChatsArrayChild) =>
    setAllChatsArray(allChatsArrayChild);
  const [currentAvatar, setCurrentAvatar] = useCookie('currentAvatar');

  const goToChat = (itemIndex) => {
    setThreadId(allChatsArray[itemIndex].threadId);
    setChannelId(allChatsArray[itemIndex].channelId);
    setIndex(itemIndex);
    history.push('/chat');
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
              />
            </Route>
            <Route exact path="/chat">
              <ChatApp
                index={index}
                setIndex={setIndexOnNewMessage}
                threadId={threadId}
                setThreadId={setThreadIdChild}
                channelId={channelId}
                setChannelId={setChannelIdChild}
                allChatsArray={allChatsArray}
                setAllChatsArray={setAllChatsArrayChild}
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
              <Link to="/chat">
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
}
