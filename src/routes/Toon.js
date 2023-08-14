import { useState,useEffect, useRef, useMemo} from 'react';
import '../css/allcom.css';
import { format } from 'date-fns'
import AddPincom from '../components/AddPincom';
import Pincom from '../components/Pincom';
import BottomNavi from "../components/BottomNavi";
import '../css/toon.css';
import TopNav from '../components/TopNav';
import {Link} from "react-router-dom"
import {throttle} from 'lodash';

function Toon({userObj,comments,scrollY, setScrollY, tabRef,setRefId,show, setShow }) {
  const [flow,setFlow] = useState(0);

  const[mLoc, setMLoc] = useState({});
  const space = window.innerWidth / 4; 

  const [toonh,setToonh] = useState(0);
  const toonRef = useRef(null);
  const imgUrl=[];
  for(let i = 1; i < 28;i++){ imgUrl[i-1] = `${process.env.PUBLIC_URL}/img/toon${i}.png`};
  
  //add 안내문구 사라지기
  const [disp,setDisp] = useState(false);
  function setDtru(){setDisp(true)};
  function disTime (){setTimeout(setDtru,2000);}
  function stop (){clearTimeout(disTime);}

  useEffect(()=>{
    console.log(flow);
    if(flow > 0) setToonh(toonRef.current.clientHeight); //toon이미지 높이값
    if(flow === 1){disTime();} 
    if(flow !== 1){
      stop();
      setDisp(false)}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[flow])

// 디테일 팝업 
const [popOpen, setPopOpen] = useState(false);
function setPtru(){setPopOpen(false)};
function disTime2 (){
  setTimeout(setDtru,1000);
  setTimeout(setPtru,1500);
}
function stop2 (){clearTimeout(disTime2);}
useEffect(()=>{
  if(popOpen === true){
    console.log(popOpen);
    disTime2();
  } 
    if(popOpen === false){
      stop2();
      setDisp(false)}
// eslint-disable-next-line react-hooks/exhaustive-deps
},[popOpen]);

  //핀모드에 들어가면 그리드제시 - 이때 다시 추가버튼이랑 하단바 안보임
  const onGrid = (e) => {
    setFlow(1);
  }; 

  //핀컴 만들때 터치한 위치값 받기
  const getLoc = (e) => {
    setMLoc({
      x: Math.ceil(e.pageX / space),
      y: Math.ceil(e.pageY / space),
      n: Math.ceil(e.pageY / (toonh / 27))
    });
    setFlow(2);
    console.log(e.pageY);
  };

  //전체 핀댓글 열고 닫기
  const onShow = () =>{
    setShow(!show);
  }

  //핀모드 활성화 비활성화
  const onDisabled = () => {
    if(flow === 0) setFlow(-1);
    else if (flow === -1) setFlow(0);
  }


  // 핀댓글 같은 위치끼리 묶기
  function groupBy (data, key) {
    return data.reduce(function (carry, el) {
      var group = el[key];

      if (carry[group] === undefined) {
        carry[group] = []
      }

      carry[group].push(el)
      return carry
    }, {})
  }
  // const groupCom = groupBy(comments,'mLoc');
  const groupCom = useMemo(() => groupBy(comments,'mLoc'),[comments]);
  const groupArr = useMemo(()=>Object.entries(groupCom),[groupCom]);

  //웹툰 하단 핀 이동 버튼
  const onTotop =() => {
    window.scrollTo({
      top: 0,
      behavior:'smooth',
    });
    if(flow === -1){setFlow(0)};
  }

//웹툰 하단 핀댓글 최근 2개
const comm2 = useMemo(()=> comments.filter((c,index) => index < 2) ,[comments]); 

//페이지이동 위치기억
const onGety= (e) => {
  setScrollY(window.scrollY);
  console.log(scrollY);
}

//플로팅 버튼들 스크롤 하냐안하냐따라 나왔다 안나왔다

  //스크롤 감지
  const [scrollPosition, setScrollPosition] = useState(0);
  const { scrollHeight } = document.documentElement;
  const inHeight = scrollHeight - window.innerHeight;
  const [navShow,setNavShow] = useState(false);

  //toon에서 스크롤을 감지하면 없애기 
  const onScroll = useMemo(() => throttle(()=>{
    setScrollPosition(document.documentElement.scrollTop || window.scrollY);
    if(flow < 1) setNavShow(false);
  },800),[flow]);

  //스크롤이 맨위거나 맨 밑이면 생기기
  useEffect(()=>{
    if(scrollPosition <= 10 || scrollPosition >= (inHeight - 2) ){
      setNavShow(true);
    }
    console.log(scrollPosition);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[scrollPosition])

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });  

//toon img에서 핀없는 위치 탭하면 생기고 없애기 
const[tLoc, setTLoc] = useState({});

//핀 있는 위치 목록 받아오기
function getmLocs(comments){
  let locsArr=[]
  for(let i = 0;i < comments.length; i++){
     locsArr = locsArr.concat(comments[i].mLoc);
  }
  return locsArr;
}
const mLocs = useMemo(()=> getmLocs(comments),[comments]);

const onNavTogg =(e)=>{
  setTLoc({
    x: Math.ceil(e.pageX / space),
    y: Math.ceil(e.pageY / space),
  });
}
//현재 핀댓글이 있는 위치들이랑 비교하기
useEffect(()=>{
  console.log(tLoc);
  if(flow < 1){
    for(let i = 0;i < mLocs.length; i++){
      if( mLocs[i] === `${tLoc.x}//${tLoc.y}` ) {
        setNavShow(navShow);
        break;} 
      setNavShow(!navShow); }
   };
// eslint-disable-next-line react-hooks/exhaustive-deps
},[tLoc])

useEffect(()=>{
  console.log(navShow);
},[navShow]);


  return (
    <div className="App" >
      <TopNav setFlow={setFlow} navShow={navShow}/>

      <div className='allconten' onClick={onNavTogg}>
      <div className='toons'>
        <div ref={toonRef} className='toonimg'>
        {imgUrl.map((url,index) =>
        <div key={index}>
          <img  src={url} alt='toon'/>
        </div>   
          )}
        </div>
    
      <div className={(flow === 0) ? 'pincoms_gridbox' : 'pincoms_gridbox disappear'}>
        { (groupArr)
        && (groupArr.map((pincom,index) =>
        <Pincom   
        ref={el =>(tabRef.current[index] = el)}
        key={pincom[1][0].id}
        gPincom={pincom} 
        userId={userObj.uid}
        show={show} setShow={setShow}
        setPopOpen={setPopOpen}
      /> ))}
      </div>
      {(flow === 2 || flow === 3) && 
      <div className='thumpincom_box'>
        <div className="pin" style={{gridColumn: mLoc.x, gridRow: mLoc.y, }}>
            <img src={`${process.env.PUBLIC_URL}/img/pin2.png`} alt="pin2"/>
        </div>
      </div>
      }
    </div>
    {(flow < 2) &&
    <div className='btm'> 
    <div className='gotoTop'>
     <div className='btpin' onClick={onTotop}>
     <img src={`${process.env.PUBLIC_URL}/img/pinbt.png`} alt="pinbt"/>
     </div>
     <h6>이 부분은 어떻게 생각하세요?</h6>
     <h5>핀모드로 다시 감상해보세요!</h5>
   </div>

   <div className='writersays'>
     <ul className="prof">
         <li className="profImg"> 
           <img src={`${process.env.PUBLIC_URL}/img/prof3.png`} alt="prof"/> 
         </li>
         <li className="nam"> 작가의 한마디 </li>
         <li className="num"> 예진﹒2022.12.15 </li>
     </ul>
     <p className="com">졸업 전시 와주셔서 감사해요 ! 다들 행복한 2022년 마무리 되길! 저희 졸업합니다 🫶</p>
 </div> 


 <div className='coms2' onClick={onGety}><Link to='/allcomment'>
   <ul className='comtt'>
     <li>전체 핀댓글 {comments.length}</li>
     <li className='goAllc'>
       <img src={`${process.env.PUBLIC_URL}/img/arrowR.png`} alt="prof"/> 
     </li> 
   </ul>
   {comm2.map((com,index) => (
         <div className="combox" key={com.id}>
         <ul className="prof">
           <li className="profImg"> 
             <img src={com.profN} alt="profOwn"/> 
           </li>
           <li className="nam"> {com.nickname}﹒{format(com.date,"yyyy.MM.dd")} </li>
             {(com.likeN > 115) && 
             <li className="best"> 
             <img src={`${process.env.PUBLIC_URL}/img/best.png`} alt="best"/> 
           </li> }
         </ul>

       <p className="com">{com.commen}</p>
       <div className="thumnail" >
         <img src={com.imgUrl} alt='cut'/>
       </div>
       
       </div>
   ))}
  </Link> 
 </div>
 </div>
    
    } 
    </div>

      {(flow === 2 || flow === 3) && 
      <AddPincom mLoc={mLoc} userObj={userObj} flow={flow} setFlow={setFlow} imgUrl={imgUrl} />
      }  
      {flow === 1 && 
      <div>
      <div className={(disp===true) ? 'tooltip disappear' : 'tooltip' }>핀댓글을 달고 싶은 위치를 터치해주세요</div>   
      <div className='grid' onClick={getLoc} toonh={toonh} style={{height:toonh}}>   
      </div>
      </div> }
      { flow === -1 &&
      <div className={ navShow ? 'floating' : 'floating disappear fltDis' } style={{left: 'calc(50% - 48px)'}}>
        <li onClick={onDisabled} className='pinon pinoff'>
          <img src={`${process.env.PUBLIC_URL}/img/pinonin.png`} alt="pinon"/>
        </li>
      </div> }
      { flow === 0 &&
      <div className={ navShow ? 'floating' : 'floating disappear fltDis' }>
      <li onClick={onShow} className='togg'>
        {show ? <img src={`${process.env.PUBLIC_URL}/img/togg2.png`} alt="togg"/>
        :  <img src={`${process.env.PUBLIC_URL}/img/togg1.png`} alt="togg"/>}
       
      </li>
      <li onClick={onDisabled} >
        <div className='pinon'>
        <img src={`${process.env.PUBLIC_URL}/img/pinonin.png`} alt="pinon"/>
        </div>

      </li>
      <li onClick={scrollPosition >= (inHeight - 200) ? undefined :onGrid} className='plus'>
        <img src={`${process.env.PUBLIC_URL}/img/plus.png`} alt="plus"/>
      </li>
    </div> 
      }

      { flow < 1 &&
       <BottomNavi scrollY={scrollY} setScrollY={setScrollY} navShow={navShow}/>
       }

    {popOpen &&  <div className={(disp===true) ? 'tooltip disappear' : 'tooltip' }>전체 댓글 목록에서 전문을 확인해주세요</div>   }
    </div>

    
  );
}

export default Toon;
