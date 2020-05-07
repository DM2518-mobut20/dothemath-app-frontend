import React from 'react';

export default function Header(props) {
  return (
    <div id="profile-header">
      <div id="profile-picture-wrapper">
        <img id="profile-picture" src={props.imgsrc} alt="profile" />
      </div>
      <div id="profile-info">
        <div id="profile-nameplate">
          <p>{props.name}</p>
        </div>
        <p>Lvl {props.level}</p>
        <div id="profile-levelbar">
          <div id="profile-levelprogress" />
        </div>
      </div>
    </div>
  );
}
