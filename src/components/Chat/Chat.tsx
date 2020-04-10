import React from 'react';
import ConversationContainer from './ConversationContainer';
import InputContainer from './InputContainer';
import {
  OnMessageCallbackData,
} from '../../Api/api';

interface ChatProps {
  name: string;
  subject?: {
    id: string;
    name: string;
  };
  messages: OnMessageCallbackData[];
  onSendMessage(text: string, image?: File): any
  onNewQuestionClick(): any
}

export default function Chat(props: ChatProps) {
  const { messages } = props;

  return (
    <div id="window-wrapper">
      <h2 id="subject-title">{props.subject?.name}</h2>
      <button onClick={props.onNewQuestionClick} id="new-question-button">Ask New Question</button>
      <div id="content-wrapper">
        <div id="chat-wrapper">
          <ConversationContainer messages={messages} />
          <InputContainer onSend={props.onSendMessage} />
        </div>
      </div>
      <img
        id="logo"
        src="img/logo_white.svg"
        alt="Site Logo"
        draggable="false"
      />
    </div>
  );
}
