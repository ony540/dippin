import React, { useState } from "react";
import backIcon from "../img/icon/back.png";
import bgmIcon from "../img/icon/bgm.png";
import Modal from "./Modal";

function TopNav({ setFlow, flow, navShow }) {
    const onFlow = () => {
        setFlow(0);
    };
    const [modalOpen, setModalOpen] = useState(false);

    const onLogoutModalOpen = () => {
        setModalOpen(true);
    };

    return (
        <>
            <nav className={navShow ? "topNav" : "topNav disappear tnvDis"}>
                <ul>
                    <li>
                        <button type="button" onClick={flow ? onFlow : onLogoutModalOpen}>
                            <img src={backIcon} alt="back" />
                        </button>
                    </li>
                    <li>우리 졸업하게 해주세요!!</li>
                    <div>
                        <img src={bgmIcon} alt="bgm" />
                    </div>
                </ul>
            </nav>
            {modalOpen && <Modal type="logout" modalOpen={modalOpen} setModalOpen={setModalOpen} />}
        </>
    );
}

export default TopNav;
