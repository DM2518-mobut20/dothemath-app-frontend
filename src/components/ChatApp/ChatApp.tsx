import React, { useState, useEffect } from 'react';
import Popup from '../Popup';
import SubjectList from '../SubjectList';
import * as api from '../../api';
import Chat from '../Chat';
import LoadingIndicator from '../LoadingIndicator';
import { useCookie } from '../../useCookie';

export default function ChatApp() {
  const [name, setName] = useCookie('name');
  const [threadId, setThreadId] = useCookie('threadId');
  const [channelId, setChannelId] = useCookie('channelId');
  const [allChats, setAllChats] = useCookie('allChats');
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([] as api.OnMessageCallbackData[]);
  const [subjects, setSubjects] = useState([] as api.Subject[]);
  useEffect(() => api.getSubjects(setSubjects), []);

  // runs when app first loads, reestablishes session if possible
  useEffect(() => {
    if (threadId && channelId) {
      api
        .reestablishSession(channelId, threadId)
        .then((res) => {
          setName(res.name);
          setChannelId(res.subject.id);
          setMessages(res.messages);
        })
        .catch((err) => {
          setChannelId('');
          setThreadId('');
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }

    api.onMessage((m) => {
      console.log('message received from backend', m);
      setMessages((y) => [...y, m]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSubjectSelect(subject: api.Subject) {
    let firstVisit = allChats === undefined;
    if (firstVisit) {
      setAllChats(
        '{ "allThreadIds" : [], "allChannelIds" : [], "text" : [], "imageURL" : [], "checkbox" : []}'
      );
    }
    setChannelId(subject.id);
    setLoading(true);

    api
      .establishSession(subject.id, name)
      .then(() => {
        console.info('session established');
        setMessages([]);
      })
      .finally(() => {
        setLoading(false);
        setThreadId('');
      });
  }

  function onSendMessage(text: string, image?: File) {
    let isFirstMessage = messages.length === 0;
    api.sendMessage(text, image).then((threadId) => {
      if (isFirstMessage) {
        setThreadId(threadId);
        let allChatsObject = allChats;
        allChatsObject.allThreadIds = allChatsObject.allThreadIds.concat(
          threadId
        );
        allChatsObject.allChannelIds = allChatsObject.allChannelIds.concat(
          channelId
        );
        allChatsObject.checkbox = allChatsObject.checkbox.concat(false);
        allChatsObject.text = allChatsObject.text.concat(text);
        allChatsObject.imageURL = allChatsObject.imageURL.concat(image);
        setAllChats(allChatsObject);
        console.log(allChats);
      }
    });

    const localMessages: api.OnMessageCallbackData[] = [];

    if (image) {
      localMessages.push({
        toFrom: 'to',
        text: '',
        name: name,
        image: URL.createObjectURL(image),
      });
    }

    if (text) {
      localMessages.push({
        toFrom: 'to',
        text,
        name: name,
      });
    }

    setMessages((messages) => [...messages, ...localMessages]);
  }

  function onNewQuestion() {
    setChannelId('');
    setThreadId('');
    setMessages([]);
    api.cancelSession();
  }

  const subject = subjects.find((s) => s.id === channelId);

  const showPopup = !name && !loading;
  const showSubjectList = !subject && !showPopup && !loading;
  const blurChat = showPopup || showSubjectList || loading;

  return (
    <div>
      {loading && <LoadingIndicator loading />}
      {showPopup && <Popup onComplete={setName} />}
      {showSubjectList && (
        <SubjectList data={subjects} onComplete={onSubjectSelect} />
      )}
      <div style={blurChat ? { filter: 'blur(5px)' } : {}}>
        <Chat
          name={name}
          subject={subject}
          messages={messages}
          onSendMessage={onSendMessage}
          onNewQuestionClick={onNewQuestion}
        />
      </div>
    </div>
  );
}