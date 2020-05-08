import React from 'react';
import Item from './Item';
import Header from './Header';

export default function Profile(props) {
  // Temporary posts-data before we get real data from the backend
  const posts = [
    {
      id: 1,
      checkmark: false,
      text: `Jag har problem med denna frågan, vad är x^2 + 4x + 39 = 19. Jag har
             försökt använda pq-formeln men jag får inte...`,
      imgurl:
        'https://www.incimages.com/uploaded_files/image/970x450/getty_470493341_20001333200092800_398689.jpg',
    },
    {
      id: 2,
      checkmark: true,
      text: `Jag har problem med denna frågan, vad är x^2 + 4x + 39 = 19. Jag har
            försökt använda pq-formeln men jag får inteJag har problem med denna frågan, vad är x^2 + 4x + 39 = 19. Jag har
            försökt använda pq-formeln men jag får inte...Jag har problem med denna frågan, vad är x^2 + 4x + 39 = 19. Jag har
            försökt använda pq-formeln men jag får inte...Jag har problem med denna frågan, vad är x^2 + 4x + 39 = 19. Jag har
            försökt använda pq-formeln men jag får inteJag har problem med denna frågan, vad är x^2 + 4x + 39 = 19. Jag har
            försökt använda pq-formeln men jag får inte...Jag har problem med denna frågan, vad är x^2 + 4x + 39 = 19. Jag har
            försökt använda pq-formeln men jag får inte...Jag har problem med denna frågan, vad är x^2 + 4x + 39 = 19. Jag har
            försökt använda pq-formeln men jag får inte...Jag har problem med denna frågan, vad är x^2 + 4x + 39 = 19. Jag har
            försökt använda pq-formeln men jag får inte.........`,
      imgurl:
        'https://www.incimages.com/uploaded_files/image/970x450/getty_470493341_20001333200092800_398689.jpg',
    },
    {
      id: 3,
      checkmark: true,
      text: `Problem...`,
      imgurl:
        'https://cdn.mos.cms.futurecdn.net/xYiTisbsp2HZPVupAZoNYQ-650-80.jpg',
    },
  ];

  const profilePic =
    process.env.PUBLIC_URL + './img/student_avatars/student1.png';

  const items = posts.map((post) => {
    return (
      <Item
        key={post.id}
        checkmark={post.checkmark}
        text={post.text}
        imgurl={post.imgurl}
        goToChat={props.goToChat}
      />
    );
  });

  return (
    <div>
      <Header name="iRob#1337" level={19} imgsrc={profilePic} />
      <div id="profile-wrapper">{items}</div>
    </div>
  );
}
