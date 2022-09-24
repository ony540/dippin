import React, { useState } from "react";
import useInputs from './hooks/useInputs';
import { UserDispatch } from './App';

function Pincom() {
    const dispatch = useContext(UserDispatch);

    const[{username, commen},onChange,reset] = useInputs({
        username:'',
        text:'',
      })

    /*const onChange = (event) => { //트윗 내용 바뀌는거 
        const { target:{value},
      } = event;
      setCommen(value);
      };*/

    const onSubmit = (e) => {
        if (commen === "") {
            return;
          }
        e.preventDefault();
        dispatch({
            type: 'CREATE_USER',
            pincom: {
              username,
              commen
            }
          });
    reset();

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

