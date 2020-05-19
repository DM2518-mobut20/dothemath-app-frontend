import React, { useState, useEffect } from 'react';
import { Popup } from '../Popup';
import { SubjectList } from '../SubjectList';
import * as api from '../../api';
import { Chat } from '../Chat';
import { LoadingIndicator } from '../LoadingIndicator';
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
    let firstVisit = props.allChatsArray === undefined;
    if (firstVisit) {
      props.setAllChatsArray([
        {
          threadId: '',
          channelId: '',
          text: '',
          imageURL: '',
          checkmark: false,
        },
      ]);

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
        let allChatsArrayObject = props.allChatsArray;
        allChatsArrayObject[props.index] = {
          threadId: threadId,
          channelId: props.channelId,
          text: text,
          imageURL: '',
          checkmark: false,
        };
        props.setAllChatsArray(allChatsArrayObject);
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
    const emptyChatObject = {
      threadId: '',
      channelId: '',
      text: '',
      imageURL: '',
      checkmark: false,
    };
    let allChatsArrayObject = props.allChatsArray;
    allChatsArrayObject = allChatsArrayObject.concat(emptyChatObject);
    props.setAllChatsArray(allChatsArrayObject);
    props.setIndex(allChatsArrayObject.length - 1);
    api.cancelSession();
  }
  function onCheckmark() {
    let allChatsArrayObject = props.allChatsArray;
    if (allChatsArrayObject[props.index] !== undefined) {
      if (
        allChatsArrayObject[props.index].threadId !== '' &&
        allChatsArrayObject.length !== 0
      ) {
        allChatsArrayObject[props.index].checkmark = true;
        props.setAllChatsArray(allChatsArrayObject);
      } else {
        console.log('No question yet');
      }
    }
  }
  const subject = subjects.find((s) => s.id === props.channelId);

  const showPopup = !name && !loading;
  const showSubjectList = !subject && !showPopup && !loading;
  const blurChat = showPopup || showSubjectList || loading;

  return (
    <div>
      {loading && <LoadingIndicator loading />}
      {showPopup && <Popup onComplete={setName} useCaptcha={true} />}
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
          allChats={props.allChatsArray}
          onCheckmarkClick={onCheckmark}
        />
      </div>
    </div>
  );
}
