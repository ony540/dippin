import React from "react";
import {Link} from "react-router-dom"

function BottomNavi() {
  return(
    <nav style={{position: "fixed", right:0 }}>
      <li>이전화</li>
      <li>컷저장</li>
      <li><Link to="/allcomment">
      전체댓글
      </Link></li>
      <li>회차목록</li>
      <li>다음화</li>
    </nav>
  )
};

export default BottomNavi;
