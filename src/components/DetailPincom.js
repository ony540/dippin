import React from "react";

function DetailPincom({pincomObj,isOwner}) {
  //isOwner이면더보기하고 삭제 아니면 신고
  return(
    <li key={pincomObj.index} className="item" style={{listStyle:"none",gridColumn: pincomObj.x, gridRow: pincomObj.y, }}>
      {pincomObj.username} {pincomObj.date} <br></br>
      {pincomObj.commen}
      </li> //리엑트 li에 있는걸 전부 아이탬으로 인지해서 고유한 key값이 필요함
   
  )
};

export default DetailPincom;
