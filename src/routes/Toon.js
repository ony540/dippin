import { useState,useEffect, useRef} from 'react';
import AddPincom from '../components/AddPincom';
import Pincom from '../components/Pincom';
import BottomNavi from "../components/BottomNavi";
import '../css/toon.css';

function Toon({userObj,comments}) {
  
  const [flow,setFlow] = useState(0);

  const[mLoc, setMLoc] = useState({});
  const space = window.innerWidth / 4; 

  const [toonh,setToonh] = useState(0);
  const toonRef = useRef(null);
  const imgUrl=[];
  for(let i = 1; i < 9;i++){ imgUrl[i-1] = `${process.env.PUBLIC_URL}/img/toon${i}.png`};
 
  useEffect(()=> { //flow바뀌면 바로 적용
    setToonh(toonRef.current.clientHeight); //toon이미지 높이값 구하기
  },[flow])


  //핀모드에 들어가면 그리드제시 - 이때 다시 추가버튼이랑 하단바 안보임
  const onGrid = (e) => {
    setFlow(1);
  }; 

  const getLoc = (e) => {
    setMLoc({
      x: Math.ceil(e.pageX / space),
      y: Math.ceil(e.pageY / space),
      n: Math.ceil(e.pageY / (toonh / 8)),
      scY : e.pageY + (space * 2)
    }); //터치한 위치값 받기
    setFlow(2);
  };

  return (
    <div className="App">
      <div ref={toonRef} className='toonimg'>
      {imgUrl.map((url,index) =>
      <div key={index}>
        <img  src={url} alt='toon'/>
      </div>   
        )}
      </div>

    <div className='pincoms_gridbox'>
    
    { flow < 1
    && (comments.map((pincom) =>
    <Pincom
      key={pincom.id}
      pincom={pincom} 
      isOwner={pincom.creatorId === userObj.uid}
      mLoc={mLoc}/> ))}
    </div>

      {flow === 2 && <AddPincom mLoc={mLoc} userObj={userObj} flow={flow} setFlow={setFlow} imgUrl={imgUrl}/>}  
      {/* 그리드 이미지 전부넣지말고 4개있는 이미지 맵으로 툰이미지 길이 값 받아와서 */}
      {flow === 1 && <div className='grid' onClick={getLoc} toonh={toonh} 
      style={{height:toonh}}> 
      </div> }
      <button onClick={onGrid} style={{ position: 'fixed', top: 40}}>핀댓글 추가하기</button>
      <div style={{ position: 'fixed', top: 40}}>X:{mLoc.y}  Y:{mLoc.x}</div>
      <BottomNavi/>
    </div>
  );
}

export default Toon;
