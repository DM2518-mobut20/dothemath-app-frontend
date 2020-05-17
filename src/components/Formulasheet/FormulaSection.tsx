import React from 'react';

export default function FormulaSection(props) {
  let image = process.env.PUBLIC_URL + './img/' + props.image;
  console.log(props.image);
  return (
    <div className="formula-container">
      <div className="formula-info" id={props.id}>
        <h2>{props.title}</h2>
        <br />
        <p>{props.info}</p>
        <br />
        <img alt="alt" src={image} />
      </div>
    </div>
  );
}
