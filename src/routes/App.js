import { useState } from 'react';
import Pincom from '../components/Pincom';
import '../css/App.css';

function App() {
  const[gVisible, setGVisible] = useState(false);
  const[iVisible, setIVisible] = useState(false);
  const[mLoc, setMLoc] = useState({});
  
  //여기 유즈이펙트 쓰기
  const space = window.innerWidth / 4; 
  console.log(space);


  //핀모드에 들어가면 그리드제시 - 이때 다시 추가버튼이랑 하단바 안보임
  const onGrid = (e) => {
    setGVisible(true);
  }; 

  const getLoc = (e) => {
    setMLoc({
      x: Math.floor(e.pageX / space) + 1,
      y: Math.floor(e.pageY / space) +1
    }); //터치한 위치값 받기

   setIVisible(true);
  };

  return (
    <div className="App" style={{ position: 'relative'}}>
      <div className='toon'><img src="img/toon.png" alt='toon'/></div>
      {/* 그리드 이미지 전부넣지말고 4개있는 이미지 맵으로 툰이미지 길이 값 받아와서 */}
      {iVisible && <Pincom mLoc={mLoc} />}
      {gVisible && <div className='grid' onClick={getLoc}><img src="img/grid.png" alt='grid'/></div> }
      <button onClick={onGrid} style={{ position: 'fixed', top: 40}}>핀댓글 추가하기</button>
      <div style={{ position: 'fixed', top: 40}}>X:{mLoc.y}  Y:{mLoc.x}</div>

    </div>
  );
}

export default App;
