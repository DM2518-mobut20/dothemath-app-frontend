import React, { useState, useEffect } from 'react';
import Popup from '../Popup';
import SubjectList from '../SubjectList';
import * as api from '../../api';
import Chat from '../Chat';
import LoadingIndicator from '../LoadingIndicator';
import { useCookie } from '../../useCookie';

export default function ChatApp(props) {
  const [name, setName] = useCookie('name');
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([] as api.OnMessageCallbackData[]);
  const [subjects, setSubjects] = useState([] as api.Subject[]);
  useEffect(() => api.getSubjects(setSubjects), []);

  // runs when app first loads, reestablishes session if possible
  useEffect(() => {
    if (props.channelId && !props.threadId) {
      props.setChannelId('');
    }
    if (props.threadId && props.channelId) {
      api
        .reestablishSession(props.channelId, props.threadId)
        .then((res) => {
          setName(res.name);
          props.setChannelId(res.subject.id);
          setMessages(res.messages);
        })
        .catch((err) => {
          props.setChannelId('');
          props.setThreadId('');
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
    let firstVisit = props.allChats === undefined;
    if (firstVisit) {
      props.setAllChats(
        `{ "allThreadIds" : [], "allChannelIds" : [], "text" : [], "imageURL" : [], "checkmark" : [${false}]}`
      );
      // new
      props.setAllChatsArray([
        {
          threadId: '',
          channelId: '',
          text: '',
          imageURL: '',
          checkmark: false,
        },
      ]);
      //new

      props.setIndex('0');
    }
    props.setChannelId(subject.id);
    setLoading(true);

    api
      .establishSession(subject.id, name)
      .then(() => {
        console.info('session established');
        setMessages([]);
      })
      .finally(() => {
        setLoading(false);
        props.setThreadId('');
      });
  }

  function onSendMessage(text: string, image?: File) {
    let isFirstMessage = messages.length === 0;
    api.sendMessage(text, image).then((threadId) => {
      if (isFirstMessage) {
        props.setThreadId(threadId);
        let allChatsObject = props.allChats;
        allChatsObject.allThreadIds[props.index] = threadId;
        allChatsObject.allChannelIds[props.index] = props.channelId;
        allChatsObject.text = allChatsObject.text.concat(text);
        allChatsObject.imageURL = allChatsObject.imageURL.concat(image);
        props.setAllChats(allChatsObject);
        //new
        let allChatsArrayObject = props.allChatsArray;
        console.log(props.allChatsArray);
        allChatsArrayObject[props.index] = {
          threadId: threadId,
          channelId: props.channelId,
          text: text,
          imageURL: '',
          checkmark: false,
        };
        props.setAllChatsArray(allChatsArrayObject);
        console.log(props.allChatsArray);
        //new
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
    props.setChannelId('');
    props.setThreadId('');
    setMessages([]);
    props.setIndex(props.allChatsArray.length);
    api.cancelSession();
  }
  function onCheckmark() {
    let allChatsArrayObject = props.allChatsArray;
    if (
      allChatsArrayObject[props.index].threadId !== '' &&
      allChatsArrayObject.length !== 0
    ) {
      allChatsArrayObject[props.index].checkmark = true;
      props.setAllChatsArray(allChatsArrayObject);
    } else {
      console.log('No question yet');
    }
    let allChatsObject = props.allChats;
    if (
      allChatsObject.allThreadIds[props.index] !== '' &&
      allChatsObject.allThreadIds.length !== 0
    ) {
      allChatsObject.checkmark[props.index] = true;
      props.setAllChats(allChatsObject);
    } else {
      console.log('No question yet');
    }
  }
  const subject = subjects.find((s) => s.id === props.channelId);

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
          allChats={props.allChats}
          onCheckmarkClick={onCheckmark}
        />
      </div>
    </div>
  );
}
