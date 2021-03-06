import React from 'react';

export default function Item(props) {
  return (
    <div className="profile-item" onClick={() => props.goToChat(props.index)}>
      {props.checkmark ? (
        <div className="profile-item-checkmark">
          <img
            src="icons/check-mark-3-512.png"
            alt="checkmark"
            className="profile-item-checkmark-img"
          />
        </div>
      ) : (
        <div className="profile-item-emptycheckmark">
          <img
            src="icons/check-mark-3-512.png"
            alt="checkmark"
            className="profile-item-checkmark-img"
          />
        </div>
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
