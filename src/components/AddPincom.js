import React, {useEffect, useState} from "react";
import { dbService } from "../fbase";
import {collection,  addDoc } from "firebase/firestore";

function AddPincom({mLoc, userObj, flow, setFlow,imgUrl }) {
  const [inputs, setInputs] = useState({
    nickname: '',
    commen: ''
  });
  const { nickname,commen } = inputs; // 비구조화 할당을 통해 값 추출
  const [cVisible, setCVisible ]= useState(false);

    useEffect(()=> {
      // console.log(flow);
    },[flow]);

    const onChange = (e) => { //사용자명이랑 핀댓글 내용 바뀌는거 
      const { name, value } = e.target; //타겟에서 네임이랑 벨류 추출
      setInputs({
        ...inputs, // 기존의 input 객체를 복사한 뒤
        [name]: value // name 키를 가진 값을 value 로 설정
      });
    };

    const onNick = (e) => {
      if (nickname === "") {
        return;
      } 
      setCVisible(true);
      };

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
        x: mLoc.x,
        y: mLoc.y,
        imgUrl : imgUrl[mLoc.n-1],
        scY : mLoc.scY,
        likeN : 0,
        report : false
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
    <>
      {!cVisible ?
      <div className="inputForm">
         <input
             className="text_input"
             name="nickname"
             value={nickname}
             onChange={onChange}
             type="text"
             placeholder="사용자명"
             maxLength={10}
           />
           <button onClick={onNick}>다음</button>
      </div>  :  
      <form  onSubmit={onSubmit} className="inputForm">
       <input
          className="text_input"
          name="commen"
          value={commen}
          onChange={onChange}
          type="text"
          placeholder="핀댓글을 입력해주세요"
          maxLength={120}
        />
        <button type="submit">등록</button>
      </form>}
    </>
  )
};

export default AddPincom;
