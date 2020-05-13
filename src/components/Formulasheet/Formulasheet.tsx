import React from 'react';
import FormulaSection from './FormulaSection';

const text0 = `\nEn av de mest kända matematiska satserna är den så kallade Pythagoras sats, som ger oss
ett samband mellan en rätvinklig triangels tre sidor. Detta är en sats som man kan få 
användning för i väldigt många olika sammanhang, då man har att göra med rätvinkliga trianglar.`;
const text1 = `Vi ska först titta på ett exempel, där vi har ett binom, bestående av summan av två termer, som ska multipliceras med sig självt (alltså kvadreras).`;

export default function Formulasheet() {
  return (
    <div className="formula">
      <FormulaSection
        title="1. Pythagoras Sats"
        info={text0}
        image="pythagoras-sats.png"
        id="formula-section"
      />
      <FormulaSection
        title="2. Första kvadreringsregeln"
        info={text1}
        image="kvadreringsregeln.png"
        id="formula-section"
      />
      <FormulaSection
        title="1. Pythagoras Sats"
        info={text0}
        image="pythagoras-sats.png"
        id="formula-section"
      />
      <FormulaSection
        title="2. Första kvadreringsregeln"
        info={text1}
        image="kvadreringsregeln.png"
        id="formula-section"
      />
      <FormulaSection
        title="1. Pythagoras Sats"
        info={text0}
        image="pythagoras-sats.png"
        id="formula-section"
      />
      <FormulaSection
        title="2. Första kvadreringsregeln"
        info={text1}
        image="kvadreringsregeln.png"
        id="formula-section"
      />
      <FormulaSection
        title="1. Pythagoras Sats"
        info={text0}
        image="null"
        id="formula-section"
      />
    </div>
  );
}
