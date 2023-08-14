import React,{ useState } from "react";
import '../css/modal.css';
import DelModal from "./DelModal";

function Del({com,isOwner}) {

  const [modalOpen, setModalOpen] = useState(false);

  // 모달창 열기
  const openDel = () => {
    setModalOpen(true);
  }

  return(
    <div>
        <div onClick={isOwner ? openDel : undefined}  className="del" >
          {isOwner ?
           <img src={`${process.env.PUBLIC_URL}/img/del.png`} alt="del"/> 
           :  <img src={`${process.env.PUBLIC_URL}/img/more.png`} alt="more"/> 
          }  
        </div>
        {modalOpen && <DelModal com={com} modalOpen={modalOpen} setModalOpen={setModalOpen}/>}
    </div>
  )
};

export default Del;
