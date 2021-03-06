import React from 'react';
import { SubjectList } from './SubjectList';

export default {
  title: 'SubjectList',
};

export const Math1 = () => (
  <SubjectList
    data={[{ name: 'Math 1', id: 'ChannelId123' }]}
    onComplete={() => {}}
  />
);

export const ManySubjects = () => (
  <SubjectList
    data={Array.from({ length: 10 }, (_, i) => ({
      name: `Math ${i + 1}`,
      id: i.toString(),
      key: i,
    }))}
    onComplete={() => {}}
  />
);
