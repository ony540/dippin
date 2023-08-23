import React from "react";
import { useNavigate } from "react-router-dom";
import prevIcon from "../img/icon/prev.png";
import cutsIcon from "../img/icon/cuts.png";
import allcomIcon from "../img/icon/allcom.png";
import listIcon from "../img/icon/list.png";
import nextIcon from "../img/icon/next.png";

function BottomNavi({ navShow }) {
    const navigate = useNavigate();

    const onClick = () => {
        navigate("/allcomment");
    };

    return (
        <nav className={navShow ? "bottomNavi" : "bottomNavi disappear bnDis"}>
            <li>
                <img src={prevIcon} alt="prev" />
            </li>
            <li>
                <img src={cutsIcon} alt="cuts" />
            </li>
            <li>
                <button type="button" onClick={onClick}>
                    <img src={allcomIcon} alt="전체 댓글 확인 버튼" />
                </button>
            </li>
            <li>
                <img src={listIcon} alt="list" />
            </li>
            <li>
                <img src={nextIcon} alt="next" />
            </li>
        </nav>
    );
}

export default BottomNavi;
