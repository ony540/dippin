import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Like from "../components/Like";
import "../css/allcom.css";
import { format } from "date-fns";
import DeleteButton from "../components/DeleteButton";
import backIcon from "../img/icon/back.png";
import fillterIcon from "../img/icon/filter.png";
import xIcon from "../img/icon/x.png";
import check1Icon from "../img/icon/check1.png";
import check2Icon from "../img/icon/check2.png";
import bestIcon from "../img/icon/best.png";
import useCommentIdState from "../hooks/useCommentIdState";
import useScroll from "../hooks/useScroll";

function Allcom({ comments, userObj, setShow, tabRef }) {
    const navigate = useNavigate();

    //베스트순, 최신순 제시 가능
    const [order, setOrder] = useState("date");
    // eslint-disable-next-line no-unused-vars
    const sortedComents = comments.sort((a, b) => b[order] - a[order]);
    const [sortNew, setSortNew] = useState(true);
    const [smodalOpen, setSmodalOpen] = useState(false);

    //필터 모달창 여닫기
    const openSort = () => {
        setSmodalOpen(true);
    };
    const closeSort = () => {
        setSmodalOpen(false);
    };

    const onSort = () => {
        if (sortNew === true) {
            setSortNew(false);
            setOrder("likeN");
        } else {
            setSortNew(true);
            setOrder("date");
        }
        setSmodalOpen(false);
    };

    //모달 밖 스크롤 막기
    useEffect(() => {
        if (smodalOpen) {
            document.body.style.cssText = `
            position: fixed; 
            top: -${window.scrollY}px;
            overflow-y: scroll;
            width: 100%;`;
        }
        return () => {
            const scrollY = document.body.style.top;
            document.body.style.cssText = "";
            window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
        };
    }, []);

    // 모달 외부 클릭시 끄기 처리
    const modalRef = useRef(null);

    useEffect(() => {
        // 이벤트 핸들러 함수
        const handler = (e) => {
            // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setSmodalOpen(false);
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

    //올라오게하기
    const [up, setUp] = useState(false);
    useEffect(() => {
        if (smodalOpen) {
            setTimeout(setUp(true), 10);
        }
    }, [smodalOpen]);

    const [, setCommentId] = useCommentIdState();

    useScroll(tabRef);
    return (
        <div className="App">
            <ul className="tit">
                <li className="back">
                    <Link to="/">
                        <img src={backIcon} alt="back" />
                    </Link>
                </li>
                <li className="txt">전체 핀댓글 {comments.length}</li>
            </ul>

            <button onClick={openSort} className="filter">
                <img src={fillterIcon} alt="filter" />
                {sortNew ? "최신순" : "좋아요순"}
            </button>
            {smodalOpen && (
                <div className="modalBack">
                    <div className={up ? "sortmodal undermodal" : "sortmodal"} ref={modalRef}>
                        <h4>필터</h4>
                        <div className="xx sortx" onClick={closeSort}>
                            <img src={xIcon} alt="x" />
                        </div>

                        <ul className="checklist">
                            <li onClick={onSort}>
                                최신순
                                {sortNew ? <img src={check1Icon} alt="check" /> : <img src={check2Icon} alt="check" />}
                            </li>
                            <li onClick={onSort}>
                                좋아요순
                                {sortNew ? <img src={check2Icon} alt="check" /> : <img src={check1Icon} alt="check" />}
                            </li>
                        </ul>
                    </div>
                </div>
            )}

            {sortedComents.map((com, index) => (
                <div className="combox" key={com.id}>
                    <ul className="prof">
                        <li className="profImg">
                            <img src={com.profN} alt="profOwn" />
                        </li>
                        <li className="nam">
                            {" "}
                            {com.nickname}﹒{format(com.date, "yyyy.MM.dd")}{" "}
                        </li>
                        {com.likeN > 115 && (
                            <li className="best">
                                <img src={bestIcon} alt="best" />
                            </li>
                        )}
                    </ul>
                    <ul className="more">
                        <li>
                            <Like pincom={com} />
                        </li>
                        <li>
                            <DeleteButton com={com} isOwner={com.creatorId === userObj.uid} />
                        </li>
                    </ul>

                    <p className="com">{com.commen}</p>
                    <div
                        onClick={() => {
                            setCommentId(index);
                            navigate("/");
                            setShow(true);
                        }}
                        className="thumnail"
                    >
                        <img src={com.imgUrl} alt="cut" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Allcom;
