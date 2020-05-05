import React from 'react';

export default function Item(props) {
  return (
    <div className="profile-item">
      {props.checkmark ? (
        <div className="profile-item-checkmark" />
      ) : (
        <div className="profile-item-emptycheckmark" />
      )}
      <div className="profile-item-text">
        <p>{props.text}</p>
      </div>
      <img className="profile-item-img" src={props.imgurl} alt="item-img" />
    </div>
  );
}
