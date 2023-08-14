import React,{useEffect, useState, useRef} from "react";
import AppRouter from "./Router";
import {authService,dbService }from "../fbase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

function App() {
  const[init, setInit] = useState(false);
  // 파이어베이스가 초기화되기를 기다려(처음엔 false) - 그다임 isLoggedIn이 바뀌기를 

  // console.log(authService.currentUser);
  const [userObj,setUserobj] = useState(null);
  const [comments, setComments] = useState([]);
  const [scrollY, setScrollY] = useState(0);
  const [refId, setRefId]= useState(null);
  const tabRef= useRef([]);
  const[show, setShow] = useState(false);

  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      //사용자의 상태가바뀌었는지 확인하는 파이어베이스 내장함수 ! !
      if (user) {
        setUserobj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
          }); //user가 누구인지 정하기

      if (user.displayName === null) { //user의 isplayName이 비어있으면 이메일 앞 아이디로 정하기
        const name = user.email.split("@")[0];
        user.displayName = name;
        }
      } else {
      setUserobj(null);
      }
      setInit(true);
      });

  },[]);

  useEffect(() => { //실시간 댓글목록 보기
    const q = query(
    collection(dbService, "comments"), //dbService안의 콜랙션 comments의 쿼리스냅샷의 Docs를 
    orderBy("date", "desc"), //생성시기 내림차순으로 들고오기
    );
 
    //스냅샷을 사용해서 실시간으로 볼 수 있음 ! ! 
    onSnapshot(q, (snapshot) => { //onSnapshot은 Snapshot을 얻는 거임  Snapshot은 우리가 가진 query와 같은것 
   
    const commenArr = snapshot.docs.map((document) => ({ //snapshot은 docs를 가지고 있음
    id: document.id,
    ...document.data(),
    }));
    setComments(commenArr); //comments 목록 업데이트
    });
    }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserobj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };



  return(
  <>
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
/>
  {init ? 
  <AppRouter 
   refreshUser={refreshUser}
   isLoggedIn={Boolean(userObj)} 
   userObj={userObj} comments={comments} scrollY={scrollY} setScrollY={setScrollY} tabRef={tabRef} refId={refId} setRefId={setRefId} 
   show={show} setShow={setShow}
  /> 
   : "Initializing..." }
  </>)
}
 
export default App;
