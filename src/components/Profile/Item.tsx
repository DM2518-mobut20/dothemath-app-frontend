import React from 'react';

export default function Item(props) {
  return (
    <div className="profile-item" onClick={() => props.goToChat(props.index)}>
      {props.checkmark ? (
        <div className="profile-item-checkmark" />
      ) : (
        <div className="profile-item-emptycheckmark" />
      )}
      <div className="profile-item-text">
        <p>{props.text}</p>
      </div>{' '}
      {props.imgurl && (
        <img className="profile-item-img" src={props.imgurl} alt="item-img" />
      )}
    </div>
  );
}
