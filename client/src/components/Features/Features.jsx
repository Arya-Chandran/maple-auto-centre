import React from "react";
import './Features.scss';

function Features({ features }) {
 
  return (
    <div className= "features">
      <h2 className="features__heading">Features</h2>
      {features.map((feature, index) => (
        <li className="features__item" key={index}>{feature}</li>
      ))}
    </div>
  );
}

export default Features;
