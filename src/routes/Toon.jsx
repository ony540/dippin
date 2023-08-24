import { useState, useEffect, useRef, useMemo } from "react";
import "../css/allcom.css";
import "../css/toon.css";
import AddPincom from "../components/AddPincom";
import Pincom from "../components/Pincom";
import BottomNavi from "../components/BottomNavi";
import TopNav from "../components/TopNav";
import Floating from "../components/Floating";
import ThumnailPincom from "../components/ThumnailPincom";
import WebtoonInfo from "../components/WebtoonInfo";
import useScroll from "../hooks/useScroll";
import useNavigationShow from "../hooks/useNavigationShow";

function Toon({ userObj, comments, tabRef, show, setShow }) {
    useScroll(tabRef);

    const [flow, setFlow] = useState(0);
    const [mLoc, setMLoc] = useState({});
    const space = 97.5;

    const [toonh, setToonh] = useState(0);
    const toonRef = useRef(null);
    const imgUrl = [];
    for (let i = 1; i < 28; i++) {
        imgUrl[i - 1] = `${process.env.PUBLIC_URL}/img/toon${i}.png`;
    }

    const [navShow, setNavShow, isOnGrid] = useNavigationShow(flow);

    useEffect(() => {
        console.log(isOnGrid);
    }, [isOnGrid]);

    //add 안내문구 사라지기
    const [disp, setDisp] = useState(false);
    function setDtru() {
        setDisp(true);
    }
    function disTime() {
        setTimeout(setDtru, 2000);
    }
    function stop() {
        clearTimeout(disTime);
    }

    useEffect(() => {
        if (flow > 0) setToonh(toonRef.current.clientHeight); //toon이미지 높이값
        if (flow === 1) {
            disTime();
        }
        if (flow !== 1) {
            stop();
            setDisp(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [flow]);

    // 디테일 팝업
    const [popOpen, setPopOpen] = useState(false);
    function setPtru() {
        setPopOpen(false);
    }
    function disTime2() {
        setTimeout(setDtru, 1000);
        setTimeout(setPtru, 1500);
    }
    function stop2() {
        clearTimeout(disTime2);
    }

    useEffect(() => {
        if (popOpen === true) {
            console.log(popOpen);
            disTime2();
        }
        if (popOpen === false) {
            stop2();
            setDisp(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [popOpen]);

    //핀컴 만들때 터치한 위치값 받기
    const getLoc = (e) => {
        setMLoc({
            x: Math.ceil(e.nativeEvent.offsetX / space),
            y: Math.ceil(e.nativeEvent.offsetY / space),
            n: Math.ceil(e.nativeEvent.offsetY / (toonh / 27)),
        });
        setFlow(2);
    };

    // 핀댓글 같은 위치끼리 묶기
    function groupBy(data, key) {
        return data.reduce(function (carry, el) {
            var group = el[key];
            if (carry[group] === undefined) {
                carry[group] = [];
            }

            carry[group].push(el);
            return carry;
        }, {});
    }

    const groupCom = useMemo(() => groupBy(comments, "mLoc"), [comments]);
    const groupArr = useMemo(() => Object.entries(groupCom), [groupCom]);

    //웹툰 하단 핀댓글 최근 2개
    const comm2 = useMemo(() => comments.filter((c, index) => index < 2), [comments]);

    //toon 탭하면 navi 생기고 없애기
    const onNavTogg = (e) => {
        setNavShow((prevNavShow) => !prevNavShow);
    };

    return (
        <div className="App">
            <TopNav setFlow={setFlow} flow={flow} navShow={navShow} />
            <div className="allconten" onClick={onNavTogg}>
                <div className="toons">
                    {/* 웹툰이미지 */}
                    <div ref={toonRef} className="toonimg">
                        {imgUrl.map((url, index) => (
                            <div key={index}>
                                <img src={url} alt="toon" />
                            </div>
                        ))}
                    </div>
                    {/* 댓글이 보이는 그리드 박스 */}
                    <div className={flow === 0 ? "pincoms_gridbox" : "pincoms_gridbox disappear"}>
                        {groupArr &&
                            groupArr.map((pincom, index) => (
                                <Pincom ref={(el) => (tabRef.current[index] = el)} key={pincom[1][0].id} gPincom={pincom} userId={userObj.uid} show={show} setShow={setShow} setPopOpen={setPopOpen} />
                            ))}
                    </div>
                    {/* 썸내일 핀 보일때 */}
                    {(flow === 2 || flow === 3) && <ThumnailPincom mLoc={mLoc} />}
                </div>
                {flow < 2 && <WebtoonInfo flow={flow} setFlow={setFlow} commentsLength={comments.length} comm2={comm2} />}
            </div>

            {/* flow2,3 - 닉네임, 댓글 작성 */}
            {(flow === 2 || flow === 3) && <AddPincom mLoc={mLoc} userObj={userObj} flow={flow} setFlow={setFlow} imgUrl={imgUrl} />}
            {/* flow1 - 댓글 위치 선정 */}
            {flow === 1 && (
                <div>
                    <div className={disp === true ? "tooltip disappear" : "tooltip"}>핀댓글을 달고 싶은 위치를 터치해주세요</div>
                    <div className="grid" onClick={getLoc} toonh={toonh} style={{ height: toonh }}></div>
                </div>
            )}
            {flow < 1 && (
                <>
                    {/* 플로팅 버튼 */}
                    <Floating flow={flow} navShow={navShow} setFlow={setFlow} setShow={setShow} show={show} isOnGrid={isOnGrid} />
                    {/* 바텀네비 */}
                    <BottomNavi navShow={navShow} />
                </>
            )}
            {/* 툴팁 */}
            {popOpen && <div className={disp === true ? "tooltip disappear" : "tooltip"}>전체 댓글 목록에서 전문을 확인해주세요</div>}
        </div>
    );
}

export default Toon;
