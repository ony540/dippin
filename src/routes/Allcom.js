import React, { } from "react";
import {Link, useNavigate} from "react-router-dom"
import Like from "../components/Like";
import '../css/allcom.css';

function Allcom({comments}) {
  //베스트순, 최신순 제시, 핀댓컷으로 이동하기 가능
  //베스트 마크 < 좋아요 개수 따라서

  //좋아요개수, 대댓글 링크댓글 개수들고 오기, 더미 대댓글 다 넣어서 가능??
 const navigate = useNavigate()

  console.log(window.location.pathname);



  return(
    <>
    <div>
    <button>베스트순</button>
    <button>최신순</button>
    </div>

    <button><Link to='/'>뒤로가기</Link></button>
    
     {comments.map((com) => (
      <div className="com" key={com.id}>
      {com.nickname} {new Date(com.date).toLocaleString()} <br></br>
      <Like  className='heart' pincom={com} />
      <p>{com.commen}</p>
      <div onClick={() => { 
        console.log(com.scY);
         navigate('/');
         window.scrollTo(0,com.scY);
      document.documentElement.scrollTo(0,10932);// 이거 안먹음 걍 죽고싶어~
     }} com={com}> <img className="thumnail" src={com.imgUrl} alt='cut'/>
      </div>
      
      </div> 
     ))}
    </>
  )
};

export default Allcom;
