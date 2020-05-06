import React, { useState } from 'react';
import AvatarModal from './AvatarModal';

const toggleAvatarModal = (toggle, setToggle) => {
  if (toggle === 'none') {
    setToggle('block');
  } else {
    setToggle('none');
  }
};

const changeAvatar = (avatarImgUrl, setCurrentAvatar) => {
  setCurrentAvatar(avatarImgUrl);
};

export default function Header(props) {
  const [toggle, setToggle] = useState('none');
  const [currentAvatar, setCurrentAvatar] = useState(props.imgsrc);
  return (
    <div id="profile-header">
      <AvatarModal
        toggle={toggle}
        changeAvatar={changeAvatar}
        setCurrentAvatar={setCurrentAvatar}
      />
      <div
        id="profile-picture-wrapper"
        onClick={() => toggleAvatarModal(toggle, setToggle)}
      >
        <img id="profile-picture" src={currentAvatar} alt="profile" />
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
