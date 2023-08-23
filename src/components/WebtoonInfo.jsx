import React from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import bestIcon from "../img/icon/best.png";
import arrowRIcon from "../img/icon/arrowR.png";
import pinBtIcon from "../img/icon/pinbt.png";

export default function WebtoonInfo({ flow, setFlow, commentsLength, comm2 }) {
    const navigate = useNavigate();
    //웹툰 하단 핀 이동 버튼
    const onTotop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        if (flow === -1) {
            setFlow(0);
        }
    };

    //페이지이동 위치기억
    const onGety = (e) => {
        navigate("/allcomment");
        // setScrollY(window.scrollY);
    };

    return (
        //바텀 텍스트
        <div className="btm">
            <div className="gotoTop">
                <div className="btpin" onClick={onTotop}>
                    <img src={pinBtIcon} alt="pinbt" />
                </div>
                <h6>이 부분은 어떻게 생각하세요?</h6>
                <h5>핀모드로 다시 감상해보세요!</h5>
            </div>

            <div className="writersays">
                <ul className="prof">
                    <li className="profImg">
                        <img src={`${process.env.PUBLIC_URL}/img/prof3.png`} alt="prof" />
                    </li>
                    <li className="nam"> 작가의 한마디 </li>
                    <li className="num"> 예진﹒2022.12.15 </li>
                </ul>
                <p className="com">졸업 전시 와주셔서 감사해요 ! 다들 행복한 2022년 마무리 되길! 저희 졸업합니다 🫶</p>
            </div>

            <div className="coms2" onClick={onGety}>
                <ul className="comtt">
                    <li>전체 핀댓글 {commentsLength}</li>
                    <li className="goAllc">
                        <img src={arrowRIcon} alt="prof" />
                    </li>
                </ul>
                {comm2?.map((com) => (
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

                        <p className="com">{com.commen}</p>
                        <div className="thumnail">
                            <img src={com.imgUrl} alt="cut" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
