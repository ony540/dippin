import React from "react";
import Like from "./Like";

function Pincom({pincom,isOwner}) {
  const {nickname, commen, date, x,y} = pincom
  //isOwner이면 ui css 색상 차이!!
  return(
    <div className="item" style={{gridColumn: x, gridRow: y, }}>
      {nickname} {new Date(date).toLocaleString()}
        <br></br>
        <Like pincom={pincom} />
      <p>{commen}</p>
      </div> 
  )
};

export default Pincom;
