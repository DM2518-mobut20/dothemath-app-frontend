import React from 'react';

interface SubjectListProps {
  data: { id: string; name: string }[];
  onComplete: (arg0: { name: string; id: string }) => void;
}

export function SubjectList(props: SubjectListProps) {
  return (
    <div id="popup">
      <div id="subjects-container">
        <h2>Choose subject</h2>
        {props?.data?.map((item, index) => (
          <button
            className="btn--primary"
            key={item.id}
            onClick={() => props.onComplete(item)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}
