import React from "react";
import {Link} from "react-router-dom"

function BottomNavi({scrollY, setScrollY,navShow}) {
  const onClick= (e) => {
    setScrollY(window.scrollY);
    console.log(scrollY);
  }

  return(
    <nav className={navShow ? "bottomNavi" : "bottomNavi disappear bnDis"}>
      <li><img src={`${process.env.PUBLIC_URL}/img/prev.png`} alt="prev"/></li>
      <li><img src={`${process.env.PUBLIC_URL}/img/cuts.png`} alt="cuts"/></li>
      <li onClick={onClick} ><Link to='/allcomment'>
        <img src={`${process.env.PUBLIC_URL}/img/allcom.png`} alt="allcoms"/>
        </Link></li>
      <li><img src={`${process.env.PUBLIC_URL}/img/list.png`} alt="list"/></li>
      <li><img src={`${process.env.PUBLIC_URL}/img/next.png`} alt="next"/></li>
    </nav>
  )
};

export default React.memo(BottomNavi);
