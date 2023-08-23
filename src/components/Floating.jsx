import React from "react";
import "../css/floating.css";
import plusIcon from "../img/icon/plus.png";
import pinOnIcon from "../img/icon/pinonin.png";
import toggOnIcon from "../img/icon/togg1.png";
import toggOffIcon from "../img/icon/togg2.png";

export default function Floating({ flow, navShow, setFlow, setShow, show, isOnGrid }) {
    //핀모드에 들어가면 그리드제시 - 이때 다시 추가버튼이랑 하단바 안보임
    const onGrid = (e) => {
        setFlow(1);
    };

    //전체 핀댓글 열고 닫기
    const onShow = () => {
        setShow((show) => !show);
    };

    //핀모드 활성화 비활성화
    const onDisabled = () => {
        if (flow === 0) setFlow(-1);
        else if (flow === -1) setFlow(0);
    };

    return (
        <>
            <div className={navShow ? "floating" : "floating disappear fltDis"} style={flow === -1 ? { left: "calc(50% - 48px)" } : undefined}>
                {flow === 0 && (
                    <li className="togg">
                        <button type="button" onClick={onShow}>
                            <img src={show ? toggOffIcon : toggOnIcon} alt="togg" />
                        </button>
                    </li>
                )}
                <li onClick={onDisabled}>
                    <button type="button" className={flow === -1 ? "pinon pinoff" : "pinon"}>
                        <img src={pinOnIcon} alt="pinon" />
                    </button>
                </li>
                {flow === 0 && (
                    <li className="plus">
                        <button type="button" onClick={isOnGrid ? undefined : onGrid}>
                            <img src={plusIcon} alt="plus" />
                        </button>
                    </li>
                )}
            </div>
        </>
    );
}
