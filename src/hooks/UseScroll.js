import { useEffect, useState } from 'react';
import _ from "lodash";
import { useLocation } from "react-router-dom";
// import {animateScroll as scroll } from 'react-scroll';
export default function UseScrollMemo() {

  const [scrollY, setScrollY] = useState(0);
  
  const { pathname } = useLocation();


  useEffect(() => {
    //전체목록에 들어가면 맨 상단으로 스크롤
    if(pathname === '/allcomment'){
      window.scrollTo(0, 0);

    // 다시 전체 홈으로 오면 이전에 저장해둔 스크롤 위치로 돌아오기
    } else if(pathname === '/') {
      window.scrollTo(0,scrollY);
    }
  }, [pathname, scrollY]);


//# 스크롤 위치 기억
//> 스크롤 저장
const handleSetScrollY = () => {
  if (pathname === "/") {
    setScrollY(window.scrollY);
    console.log(scrollY);
  } 
};

//> 스크롤 감지
useEffect(() => {
  const watch = () => {
    window.addEventListener("scroll", _.debounce(handleSetScrollY, 100));
  };
  watch();
  return () => {
    window.removeEventListener("scroll", _.debounce(handleSetScrollY, 100));
  };
});

  }