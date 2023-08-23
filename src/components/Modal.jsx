import React, { useEffect, useRef, useState } from "react";
import { dbService } from "../fbase";
import { deleteDoc, doc } from "firebase/firestore";
import "../css/modal.css";
import { getAuth, signOut } from "firebase/auth";
import xIcon from "../img/icon/x.png";
import delBoo from "../img/delboo.png";

function Modal({ type = "delete", com, modalOpen, setModalOpen }) {
    //모달창 닫기
    const closeModal = () => {
        setModalOpen(false);
    };

    //삭제하기
    const ComRef = com ? doc(dbService, "comments", `${com.id}`) : undefined;
    const onDel = async () => {
        try {
            await deleteDoc(ComRef);
        } catch (error) {
            window.alert("댓글을 삭제하는 데 실패했습니다");
        }
    };

    const onSignOut = () => {
        try {
            const auth = getAuth();
            signOut(auth);
        } catch (error) {
            window.alert("로그아웃에 실패했습니다");
        }
    };

    //모달 밖 스크롤 막기
    useEffect(() => {
        document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
        return () => {
            const scrollY = document.body.style.top;
            document.body.style.cssText = "";
            window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
        };
    }, []);

    // 모달 외부 클릭시 끄기 처리
    const modalRef = useRef(null);

    //올라오게하기
    const [up, setUp] = useState(false);
    useEffect(() => {
        if (modalOpen) {
            setTimeout(setUp(true), 10);
        }
    }, [modalOpen]);

    useEffect(() => {
        // 이벤트 핸들러 함수
        const handler = (e) => {
            // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setModalOpen(false);
            }
        };

        // 이벤트 핸들러 등록
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler); // 모바일 대응

        return () => {
            // 이벤트 핸들러 해제
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("touchstart", handler); // 모바일 대응
        };
    });

    return (
        <div className="modalBack">
            <div className={up ? "modal undermodal" : "delmodal"} ref={modalRef}>
                <button type="button" className="xx" onClick={closeModal}>
                    <img src={xIcon} alt="x" />
                </button>
                <img className="delboo" src={delBoo} alt="delboo" />
                <h6>{type === "delete" ? "정말 삭제하실래요?" : "로그아웃하시겠나요?"}</h6>
                <p>{type === "delete" && "여러분의 댓글이 필요해요"}</p>
                <div className="btns">
                    <button type="button" className="btn" onClick={closeModal}>
                        뒤로가기
                    </button>
                    <button type="button" className="btn btO" onClick={type === "delete" ? onDel : onSignOut}>
                        {type === "delete" ? "삭제하기" : "로그아웃"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default React.memo(Modal);
