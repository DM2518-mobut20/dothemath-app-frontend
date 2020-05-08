import React from 'react';

export default function AvatarBtn(props) {
  return (
    <div
      className="profile-avatar-button"
      onClick={() => props.changeAvatar(props.imgsrc, props.setCurrentAvatar)}
    >
      <img
        src={props.imgsrc}
        alt={'avatar'}
        className={'profile-avatar-button-image'}
      ></img>
    </div>
  );
}
