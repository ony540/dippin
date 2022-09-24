import { useReducer, useCallback } from "react";

//21. 커스텀 Hooks 만들기 - useReducer 사용 //완전 이해 x....ㅜ

/*
use로 시작하는 어쩌구~로 훅 이름 짓기 ! !
반복되는 로직
커스텀 Hooks 를 만들어서 반복되는 로직을 쉽게 재사용하는 방법을 알아보겠습니다.


유즈 리듀서 기본 사용방법!! 
const [form, dispatch] = useReducer(reducer,initialForm);
form - 앞으로 컴포넌트에서 사용 할 수 있는 상태
dispatch-액션을 발생시키는 함수라고 이해

첫번째 파라미터는 reducer 함수
두번째 파라미터는 초기 상태 initialForm

컴포넌트에서 dispatch 함수에 행동(action)을 던지면, ex)dispatch({ type: 'CHANGE', name, value});
reducer 함수가 이 행동(action)에 따라서 상태(state)를 변경해줍니다.

 */
function reducer (state, action){ //
  switch (action.type) {
    case 'CHANGE':
      return{
        ...state, //새로운 상태를 만들 때에는 불변성을 지켜주어야 하기 때문에 spread 연산자
          [action.name]: action.value // 인풋이 없음! 값을 이렇게 바꿔
        };
    case 'RESET':
      return Object.keys(state).reduce((acc,current) => {
        acc[current] = ''; //누적값의 현재값인덱스 요소를 비우기
        return acc; //누적값 반환
      },{}); //초기값 없는걸로 설정
    default:
       return state;
  }

  /*
  <reduce()함수 사용법>

  - 배열.reduce((누적값, 현잿값, 인덱스, 요소) => { 명령문; return 결과; }, 초깃값);

  <Object.keys(obj) 메소드>
  - 전달된 객체에서 직접 찾은 열거할 수 있는 속성 이름에 해당하는 문자열 배열을 반환 
  속성 이름의 순서는 객체의 속성을 수동으로 반복하여 지정하는 것과 동일

  obj - 열거할 수 있는 속성 이름들을 반환 받을 객체
  반환값 - 전달된 객체의 열거할 수 있는 모든 속성 이름들을 나타내는 문자열 배열
  */
}

function useInputs(initialForm) { //해당 인풋- 폼에서 관리할 초기값 app.js에서 사용

  const [form, dispatch] = useReducer(reducer,initialForm);
  // form, dispatch로 비구조할당문법으로 추출하여 컴포넌트에 전달 (리듀서로 선언

  const onChange = useCallback(e => {
    const { name, value } = e.target; //타겟에서 네임이랑 벨류 추출
    dispatch({
      type: 'CHANGE',
      name,
      value
    }); //폼업데이트 - 네임값에다가 벨류에 넣기
  }, []); //댑스는 비워주기 의존하는 다른 상태가 없기에 


  const reset = useCallback(() => {
    dispatch({
      type: 'RESET'
    })
  }); //초기화 - 첫번째값을 가져오고 댑스에 이니셜폼 들고오기

  return [form, onChange, reset]; //배열형태로 내보내기 
  //상태조회, 변화값을 가져옴 , 초기화할때 호출
};

export default useInputs;