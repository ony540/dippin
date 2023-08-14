import { useEffect } from 'react';
import { useLocation } from "react-router-dom";

export default function UseScroll({scrollY,refId,tabRef}) {

  const { pathname } = useLocation();

  useEffect(() => {
    console.log(pathname);
    //전체목록에 들어가면 맨 상단으로 스크롤
    if(pathname === '/allcomment'){
      window.scrollTo(0, 0);
    
    // 다시 전체 홈으로 오면 이전에 저장해둔 스크롤 위치로 돌아오기
    } else if(pathname === '/') {
      window.scrollTo(0,scrollY);
    }
  }, [pathname, scrollY]);

  //allcom에서 이미지클릭하면 해당 위치로 이동
  useEffect(()=>{
    console.log(refId);
    tabRef.current[refId] &&
    tabRef.current[refId].scrollIntoView({block: "center"});
  },[ refId, tabRef])

}