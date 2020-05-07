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

  return (
    <div id="window-wrapper">
      <div id="title-container">
        <button onClick={props.onNewQuestionClick} id="new-question-button">
          Ask New Question
        </button>
        <h2 id="subject-title">{props.subject?.name}</h2>
        {props.allChats === undefined ? (
          <button
            id="chat-empty-checkmark"
            className="profile-item-emptycheckmark"
            onClick={props.onCheckmarkClick}
          />
        ) : props.allChats.checkmark[props.index] ? (
          <button id="chat-checkmark" className="profile-item-checkmark" />
        ) : (
          <button
            id="chat-empty-checkmark"
            className="profile-item-emptycheckmark"
            onClick={props.onCheckmarkClick}
          />
        )}
      </div>
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
