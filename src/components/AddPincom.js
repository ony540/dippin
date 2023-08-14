import React, {useEffect, useState,useRef, useCallback} from "react";
import { dbService } from "../fbase";
import {collection,  addDoc } from "firebase/firestore";
import '../css/addcom.css';

function AddPincom({mLoc, userObj, flow, setFlow,imgUrl }) {
  
  const [inputs, setInputs] = useState({
    nickname: '',
    commen: ''
  });
  const { nickname,commen } = inputs; // 비구조화 할당을 통해 값 추출
  const [cVisible, setCVisible ]= useState(false);
  const inputRef = useRef([]);
  const profUrl=[];  //프로필 지정
  for(let i = 1; i < 21;i++){ profUrl[i-1] = `${process.env.PUBLIC_URL}/img/prof${i}.png`};


  // 사용자명 커서 포커스
  useEffect(()=> { 
    if(flow === 2) inputRef.current[0].focus(); 
    if(flow === 3) inputRef.current[1].focus(); 
  },[flow]);

  //모달 밖 스크롤 막기
  useEffect(() => {
    document.querySelector('.toons').style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;
      background : transparent`;

    return () => {
      const scrollY = document.querySelector('.toons').style.top;
      document.querySelector('.toons').style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  //사용자명이랑 핀댓글 내용 바뀌는거
  const onChange = useCallback((e) => { 
    const { name, value } = e.target; //타겟에서 네임이랑 벨류 추출
    setInputs(inputs => ({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value // name 키를 가진 값을 value 로 설정
    }));
  },[]);

  // 닉네임 설정
  const onNick = (e) => {
    if (nickname === "") {
      return;
    } 
    setCVisible(true);
    setFlow(3);
    };

  //엔터해도 입력됨
  const handleOnKeyPress = e => {
      if (e.key === 'Enter') {
        e.preventDefault();
          onNick();     
      }
  };
      
  //핀댓글  등록
  const onSubmit = async(event) => {
      if (commen === "") {
          return;
        }
  event.preventDefault();
  try {
    const pincomObj = { //트윗 오브젝트
      nickname, 
      commen,
      date: Date.now(),
      creatorId: userObj.uid,
      mLoc:`${mLoc.x}//${mLoc.y}`,
      x: mLoc.x,
      y: mLoc.y,
      imgUrl : imgUrl[mLoc.n-1],
      likeN : 0,
      profN : profUrl[Math.floor(Math.random() * 21)]
    };

    await addDoc(collection(dbService, "comments"), pincomObj); 
    //트윗하기 누르면 pincomObj 형태로 새로운 document 생성하여 comments 콜렉션에 넣기

  } catch (e) {
  console.error("Error adding document: ", e);
  }
  setInputs({
    nickname: '',
    commen: '',
  });
  setFlow(0);
  };


  return(
    <div>
      {!cVisible ?
      <>
      <div className="inputbox"> 

      <div className="order">닉네임을 설정해주세요</div>
      <div className="letterlimit">{nickname.length} / 7</div>
      <div className="inputForm">
         <input
             className="text_input"
             name="nickname"
             value={nickname}
             onChange={onChange}
             onKeyPress={handleOnKeyPress}
             type="text"
             placeholder="어떤 닉네임으로 하실래요?"
             maxLength={7}
            ref={el =>(inputRef.current[0] = el)}
           />
           <button onClick={onNick} className={nickname ? "canSm" : undefined}>
            <img src={`${process.env.PUBLIC_URL}/img/submit.png`} alt='submit'/>
           </button>
      </div>
      </div>
      </>
        :  
      <>
      <div className="inputbox">
      <div className="order">핀댓글을 입력해주세요</div>
      <div className="letterlimit">{commen.length} / 120</div>
      <form  onSubmit={onSubmit} className="inputForm">
       <input
          className="text_input"
          name="commen"
          value={commen}
          onChange={onChange}
          type="text"
          placeholder="여러분의 감상을 남겨주세요!"
          maxLength={120}
          ref={el =>(inputRef.current[1] = el)}
        />
        <button type="submit" className={commen ? "canSm" : undefined}>
          <img src={`${process.env.PUBLIC_URL}/img/submit.png`} alt='submit'/>
        </button>
      </form>
      </div>
      </>
      }
    </div>
  )
};

export default React.memo(AddPincom);
