import { useEffect, useState } from 'react';
import '../css/App.css';

function App() {
  const[gVisible, setGVisible] = useState(false);
  const[mLoc, setMLoc] = useState({});

  useEffect(() => {
    // const width = window.innerWidth;

  },[]);
  // 의존값이 들어있는 배열 (deps) []을 넣음 - 만약에 deps 배열을 비우게 된다면, 컴포넌트가 처음 나타날때에만 useEffect에 등록한 함수가 호출됨

  //핀모드에 들어가면 그리드제시 - 이때 다시 추가버튼이랑 하단바 안보임
  const onGrid = (e) => {
    setGVisible(true);
  }; 


  const getLoc = (e) => {
    setMLoc({
      x: e.pageX,
      y: e.pageY
    }); //터치한 위치값 받기

   //setGVisible(false);
  };

  return (
    <div className="App">
      <div className='toon'><img src="img/toon.png" alt='toon'/></div>
      {/* 그리드 이미지 전부넣지말고 4개있는 이미지 맵으로 툰이미지 길이 값 받아와서 */}
      {gVisible && <div className='grid' onClick={getLoc}><img src="img/grid.png" alt='grid'/></div> }
      <button onClick={onGrid}>핀댓글 추가하기</button>
      <div>X:{mLoc.y}  Y:{mLoc.x}</div>

    </div>
  );
}

export default App;
