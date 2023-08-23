import React, { useState } from "react";
import "../css/modal.css";
import Modal from "./Modal";
import delIcon from "../img/icon/del.png";
import moreIcon from "../img/icon/more.png";

function DeleteButton({ com, isOwner }) {
    const [modalOpen, setModalOpen] = useState(false);

    // 모달창 열기
    const openDel = () => {
        setModalOpen(true);
    };

    return (
        <>
            <div onClick={isOwner ? openDel : undefined} className="del">
                {isOwner ? <img src={delIcon} alt="del" /> : <img src={moreIcon} alt="more" />}
            </div>
            {modalOpen && <Modal com={com} modalOpen={modalOpen} setModalOpen={setModalOpen} />}
        </>
    );
}

export default DeleteButton;
