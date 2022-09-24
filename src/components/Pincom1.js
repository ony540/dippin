import React, { useState } from "react";

function Pincom() {
    const [user, setUser] = useState("");
    const [commen, setCommen] = useState("");

    const onChange = (event) => { //트윗 내용 바뀌는거 
        const { target:{value},
      } = event;
      setCommen(value);
      };

    const onSubmit = async(e) => {
        if (commen === "") {
            return;
          }
        e.preventDefault();
    try {
      const commObj = { //트윗 오브젝트
        userName:'나영', 
        text: commen,
        createdAt: Date.now(),
     };
     await addDoc(collection(dbService, "nweets"), nweetObj); 
     //트윗하기 누르면 nweetObj 형태로 새로운 document 생성하여 nweets 콜렉션에 넣기
     
    } catch (e) {
    console.error("Error adding document: ", e);
  }
    setUser(""); //유저이름 칸 비우기
    setCommen(""); //핀댓글 비우기

    };
  return(
    <div>
      <form onSubmit={onSubmit} className="inputForm">
      <input
          className="text_input"
          value={commen}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
      </form>
    </div>
  )
};

export default Pincom;
