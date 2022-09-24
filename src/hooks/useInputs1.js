//유즈인풋 훅 써서 값 받는거-> 각각 순서대로 받을 수 있게하기 
//파이어베이스 연동하기 

import { useState, useCallback } from "react";

//21. 커스텀 Hooks 만들기 - useState 사용

/*
use로 시작하는 어쩌구~로 훅 이름 짓기 ! !
반복되는 로직
커스텀 Hooks 를 만들어서 반복되는 로직을 쉽게 재사용하는 방법을 알아보겠습니다.
 */

function useInputs(initialForm) { //해당 인풋 폼에서 관리할 초기값
  const [form, setForm] = useState(initialForm);

  const onChange = useCallback(e => {
    const { name, value } = e.target; //타겟에서 네임이랑 벨류 추출
    setForm(form =>({...form, [name]: value}));  //폼업데이트 - 네임값에다가 벨류에 넣기
  }, []); //댑스는 비워주기 의존하는 다른 상태가 없기에 

  const reset = useCallback(() => setForm(initialForm), [initialForm]); //초기화 - 첫번째값을 가져오고 댑스에 이니셜폼 들고오기

  return [form, onChange, reset]; //배열형태로 내보내기 
  //상태조회, 변화값을 가져옴 , 초기화할때 호출
};

export default useInputs;