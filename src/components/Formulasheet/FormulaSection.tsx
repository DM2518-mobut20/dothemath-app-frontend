import React from 'react';

function checkImage(image) {
  if (image) {
    console.log('true:', image);
    return true;
  } else {
    console.log('false:', image);
    return false;
  }
}

function selectImage(src, width, height) {
  var img = document.createElement('IMG');
  img.setAttribute('src', src);
  img.setAttribute('width', width);
  img.setAttribute('height', height);
  document.body.appendChild(img);
}

export default function FormulaSection(props) {
  let image = process.env.PUBLIC_URL + './img/' + props.image;
  console.log(props.image);
  return (
    <div className="formula-container">
      <div className="formula-info" id={props.id}>
        <h2>{props.title}</h2>
        <br></br>
        <p>{props.info}</p>
        <br></br>
        <img src={image} />
      </div>
    </div>
  );
}
//<img src={checkImage(image) ? image : null} />}
