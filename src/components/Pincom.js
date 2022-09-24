import React, { useState} from "react";

function Pincom({mLoc}) {

      
    const [username, setUsername] = useState("");
    const [commen, setCommen] = useState("");
    const [commens, setCommens] = useState([]);

    const onChange1 = (event) => { //사용자명 내용 바뀌는거 
        const { target:{value},
      } = event;
      setUsername(value);
      };

    const onChange2 = (event) => { //댓글 내용 바뀌는거 
        const { target:{value},
      } = event;
      setCommen(value);
      };

    const onSubmit = async(e) => {
        if (commen === "" || username === "") {
            return;
          }
        e.preventDefault();
    try {
      const pincom = { //트윗 오브젝트
        username, 
        commen,
        // date: Date.now(),
     };
     await  setCommens(currentArray => [...currentArray,pincom] ) //currentArray를 받아오서 (이전게 담은)새로운 어래이를 리턴 해주기 
    } catch (e) {
    console.error("Error adding document: ", e);
  }
    setUsername(""); //유저이름 칸 비우기
    setCommen(""); //핀댓글 칸 비우기
    };

  return(
    <div>
      <form onSubmit={onSubmit} className="inputForm">
      <input
          className="text_input"
          value={username}
          onChange={onChange1}
          type="text"
          placeholder="사용자명"
          maxLength={120}
        />
      <input
          className="text_input"
          value={commen}
          onChange={onChange2}
          type="text"
          placeholder="핀댓글을 입력해주세요"
          maxLength={120}
        />
        <button>등록</button>
      </form>
      <hr />
      <div className='gridbox'>
      {commens.map((pincom) =>  //map함수의 첫번째 인자는 value(todo), 두번째 인자는 index(인덱스번호) array
      <li key={pincom.index} className="item" style={{listStyle:"none",gridColumn: mLoc.x, gridRow: mLoc.y, }}>
        {pincom.username} {pincom.date} <br></br>
        {pincom.commen}</li> //리엑트 li에 있는걸 전부 아이탬으로 인지해서 고유한 key값이 필요함
      )}
      </div>

    </div>
  )
};

export default Pincom;
