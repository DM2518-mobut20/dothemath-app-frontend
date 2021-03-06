import React from 'react';
import Item from './Item';
import Header from './Header';

export default function Profile(props) {
  if (props.currentAvatar === undefined) {
    props.changeAvatar(
      process.env.PUBLIC_URL + './img/student_avatars/student1.png'
    );
  }
  const items =
    props.allChatsArray &&
    props.allChatsArray.map((post, index) => {
      return (
        <Item
          key={index}
          index={index}
          checkmark={post.checkmark}
          text={post.text}
          imgurl={post.imgURL}
          goToChat={props.goToChat}
        />
      );
    });

  return (
    <div>
      <Header
        name="iRob#1337"
        level={19}
        currentAvatar={props.currentAvatar}
        changeAvatar={props.changeAvatar}
      />
      <div id="profile-wrapper">{items}</div>
    </div>
  );
}
