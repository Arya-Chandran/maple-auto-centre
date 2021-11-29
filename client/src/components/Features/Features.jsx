import React from "react";
//import Features from './Feature.scss';

function Features({ features }) {
 //console.log(features);
 
  return (
    <div>
      <p>Features</p>
      {features.map((feature, index) => (
        <li key={index}>{feature}</li>
      ))}
    </div>
  );
}

export default Features;
