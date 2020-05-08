import React from 'react';
import ConversationContainer from './ConversationContainer';
import InputContainer from './InputContainer';
import { OnMessageCallbackData } from '../../api';

interface ChatProps {
  name: string;
  subject?: {
    id: string;
    name: string;
  };
  messages: OnMessageCallbackData[];
  onSendMessage(text: string, image?: File): any;
  onNewQuestionClick(): any;
  index: number;
  allChats: any;
  onCheckmarkClick(): any;
}

export default function Chat(props: ChatProps) {
  const { messages } = props;

  const emptyCheckmark = (
    <button
      id="chat-empty-checkmark"
      className="profile-item-emptycheckmark"
      onClick={props.onCheckmarkClick}
    />
  );
  const checkedCheckmark = (
    <button id="chat-checkmark" className="profile-item-checkmark" />
  );
  function displayCheckmark(bool) {
    if (bool) {
      return checkedCheckmark;
    } else {
      return emptyCheckmark;
    }
  }

  function displayInputField(bool) {
    if (bool) {
      return <InputContainer onSend={props.onSendMessage} />;
    }
  }
  return (
    <div id="window-wrapper">
      <div id="title-container">
        <button onClick={props.onNewQuestionClick} id="new-question-button">
          New Question
        </button>
        <h2 id="subject-title">{props.subject?.name}</h2>
        {props.allChats === undefined
          ? displayCheckmark(false)
          : props.allChats.checkmark[props.index]
          ? displayCheckmark(true)
          : displayCheckmark(false)}
      </div>
      <div id="content-wrapper">
        <div id="chat-wrapper">
          <ConversationContainer messages={messages} />
          {props.allChats === undefined
            ? displayInputField(true)
            : props.allChats.checkmark[props.index]
            ? displayInputField(false)
            : displayInputField(true)}
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
