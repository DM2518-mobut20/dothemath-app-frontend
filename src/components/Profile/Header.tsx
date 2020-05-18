import React, { useState } from 'react';
import AvatarModal from './AvatarModal';

const toggleAvatarModal = (toggle, setToggle) => {
  if (toggle === 'none') {
    setToggle('block');
  } else {
    setToggle('none');
  }
};

export default function Header(props) {
  const [toggle, setToggle] = useState('none');
  return (
    <div id="profile-header">
      <AvatarModal
        toggle={toggle}
        changeAvatar={props.changeAvatar}
        setCurrentAvatar={props.setCurrentAvatar}
      />
      <div
        id="profile-picture-wrapper"
        onClick={() => toggleAvatarModal(toggle, setToggle)}
      >
        <img id="profile-picture" src={props.currentAvatar} alt="profile" />
      </div>
      <div id="profile-info">
        <div id="profile-nameplate">
          <p>{props.name}</p>
        </div>
      </div>
    </div>
  );
}
