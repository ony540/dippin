import React from "react";

function TopNav({setFlow, navShow}) {
  const onFlow =() =>{
    setFlow(0);
  };

  return(
    <nav className={ navShow ? 'topNav'  : 'topNav disappear tnvDis' }>
      <ul>
        <li onClick={onFlow}><img src={`${process.env.PUBLIC_URL}/img/back.png`} alt="back"/></li>
        <li>우리 졸업하게 해주세요!!</li>
        <div><img src={`${process.env.PUBLIC_URL}/img/bgm.png`} alt="bgm"/></div>
      </ul>
    </nav>
  )
};

export default React.memo(TopNav);
