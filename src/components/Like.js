import React,{ useState,useEffect } from "react";
import { dbService} from "../fbase";
import {doc, updateDoc } from "firebase/firestore";


function Like({pincom,isOwner}) {
    const [like,setLike] = useState(false);
    const HeartImg1 = `${process.env.PUBLIC_URL}/img/heart1.png`;
    const HeartImg2 = `${process.env.PUBLIC_URL}/img/heart2.png`;
    const HeartImg3 = `${process.env.PUBLIC_URL}/img/heart3.png`;

    const [lnum, setLnum] = useState(pincom.likeN);
    const likeNRef = doc(dbService, "comments", `${pincom.id}`);

    useEffect(()=> {
        updateDoc(likeNRef, {
            likeN: lnum,
            });
    },[likeNRef, lnum]);

    const onLike =  () => {
       if (!like) {
           setLnum((lnum)=>lnum + 1);
        } else {
           setLnum((lnum)=>lnum - 1);
        }
        setLike(!like);
    };

  return(
    <div className="like" style={{height:'17px'}}>
    <div onClick={onLike} style={{width: '16px', height:'16px', margin: '0px 3px 0 0'}} >
     <img src={like? HeartImg2 : (isOwner) ? HeartImg3 :HeartImg1} alt='heart'/>
    </div>
      <div className="num1" style={{lineHeight:'17px'}} >{pincom.likeN} </div>
    </div>
  )
};

export default React.memo(Like);
