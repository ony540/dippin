import React,{ useState,useEffect } from "react";
import { dbService} from "../fbase";
import {doc, updateDoc } from "firebase/firestore";


function Like({pincom}) {
    const [like,setLike] = useState(false);
    const HeartImg = `${process.env.PUBLIC_URL}/img/heart.png`;
    const  EmptyHeartImg = `${process.env.PUBLIC_URL}/img/em_heart.png`;

    const [lnum, setLnum] = useState(pincom.likeN);
    const likeNRef =doc(dbService, "comments", `${pincom.id}`);

 
    useEffect(()=> {
        updateDoc(likeNRef, {
            likeN: lnum,
            });
    },[likeNRef, lnum]);

    const onLike = () => {
       if (!like) {
           setLnum((lnum)=>lnum + 1);
        } else {
           setLnum((lnum)=>lnum - 1);
        }
        setLike(!like);
    };

  return(
    <>
    <div onClick={onLike} style={{width:'15px',height:'15px',display:'inline-block'}}>
     <img src={like?HeartImg:EmptyHeartImg} alt='heart'/>
    </div>
      :  {pincom.likeN}
    </>
    
  )
};

export default Like;
