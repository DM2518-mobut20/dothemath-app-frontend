import React, { useState, useEffect } from 'react';
import Popup from '../Popup';
import SubjectList from '../SubjectList';
import * as api from '../../api';
import Chat from '../Chat';
import LoadingIndicator from '../LoadingIndicator';
import { useCookie } from '../../useCookie';

export default function ChatApp(props) {
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
    if (channelId && !threadId) {
      setChannelId('');
    }
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
        `{ "allThreadIds" : [], "allChannelIds" : [], "text" : [], "imageURL" : [], "checkmark" : [${false}]}`
      );
      props.setIndex('0');
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
        allChatsObject.allThreadIds[props.index] = threadId;
        allChatsObject.allChannelIds[props.index] = channelId;
        allChatsObject.text = allChatsObject.text.concat(text);
        allChatsObject.imageURL = allChatsObject.imageURL.concat(image);
        setAllChats(allChatsObject);
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
    let allChatsObject = allChats;
    allChatsObject.allThreadIds = allChatsObject.allThreadIds.concat('');
    allChatsObject.allChannelIds = allChatsObject.allChannelIds.concat('');
    allChatsObject.checkmark = allChatsObject.checkmark.concat(false);
    props.setIndex(allChatsObject.allThreadIds.length - 1);
    setAllChats(allChatsObject);
    api.cancelSession();
  }
  function onCheckmark() {
    let allChatsObject = allChats;
    if (
      allChatsObject.allThreadIds[props.index] !== '' &&
      allChatsObject.allThreadIds.length !== 0
    ) {
      allChatsObject.checkmark[props.index] = true;
      setAllChats(allChatsObject);
    } else {
      console.log('No question yet');
    }
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
          index={props.index}
          allChats={allChats}
          onCheckmarkClick={onCheckmark}
        />
      </div>
    </div>
  );
}
