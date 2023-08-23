import React, { forwardRef, useEffect, useState } from "react";
import Slider from "react-slick";
import "../css/pincom.css";
import { format } from "date-fns";
import Like from "./Like";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import pin1Icon from "../img/pin1.png";
import pin2Icon from "../img/pin2.png";
import tail1Icon from "../img/tail1.png";
import tail2Icon from "../img/tail2.png";

const Pincom = forwardRef(({ gPincom, userId, show, setPopOpen }, ref) => {
    const [open, setOpen] = useState(false);
    const [tail, setTail] = useState(0);

    useEffect(() => {
        if (gPincom[1][0].y <= 3 && gPincom[1][0].x <= 2) setTail(1);
        else if (gPincom[1][0].y <= 3 && gPincom[1][0].x > 2) setTail(2);
        else if (gPincom[1][0].y >= 3 && gPincom[1][0].x <= 2) setTail(3);
        else if (gPincom[1][0].y >= 3 && gPincom[1][0].x > 2) setTail(4);
    }, [gPincom]);

    // 각각 클릭했을 때
    const onOpen = (e) => {
        e.stopPropagation();
        setOpen(!open);
    };

    //토글로 클릭했을 때
    useEffect(() => {
        if (show) {
            // console.log(tail);
            setOpen(true);
        } else {
            setOpen(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tail, show]);

    // 한 위치에 두개 이상 일때 상단 바로 좌우 스와이프
    //두줄이상이면 true
    const [length, setLength] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line array-callback-return
        gPincom[1].map((pincom) => {
            if (pincom.commen.length >= 20) {
                setLength(true);
            }
        });
    }, [gPincom]);

    //내부 핀댓글 1개
    const inPincom = gPincom[1].map((pincom) => {
        const { nickname, date, commen, profN, creatorId } = pincom;
        const isOwner = creatorId === userId;
        const overLength = commen.length > 40;

        return (
            <div key={pincom.id} onClick={overLength ? () => setPopOpen(true) : undefined}>
                <div className={isOwner ? "combox2 cb" + tail : "combox1 cb" + tail}>
                    <div className="topbar"></div>
                    <div className="txtBox">
                        <ul className="prof1">
                            <div>
                                <li className="profImgs">
                                    <img src={profN} alt="prof" />
                                </li>
                                <li className="nam1"> {nickname} </li>
                                <li className="num1"> {format(date, "yyyy.MM.dd")} </li>
                            </div>
                            <Like pincom={pincom} isOwner={isOwner} />
                        </ul>

                        <p className={length && commen.length < 20 ? "com1 cts" : "com1"}>{commen}</p>
                    </div>
                </div>
                <div className={length && tail < 3 ? "tail t" + tail + " tmor2" : "tail t" + tail}>
                    <img src={isOwner ? tail2Icon : tail1Icon} alt="tail" />
                </div>
            </div>
        );
    });

    // 슬라이더 셋팅
    const settings = {
        arrows: false,
        dots: true,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        appendDots: (dots) => (
            <div
                style={{
                    width: "calc(100% - 17px)",
                    position: "absolute",
                    top: "4px",
                }}
            >
                <ul> {dots} </ul>
            </div>
        ),
    };

    return (
        <div ref={ref} style={{ gridColumn: gPincom[1][0].x, gridRow: gPincom[1][0].y }}>
            <button onClick={onOpen} className="pin">
                <img src={gPincom[1][0].creatorId === userId ? pin2Icon : pin1Icon} alt="핀댓글 아이콘" />
            </button>
            {open && (
                <div className={length && tail >= 3 ? "comcontain ct" + tail + " more2L" : "comcontain ct" + tail}>
                    <Slider
                        {...settings}
                        dotsClass={gPincom[1][0].creatorId === userId ? (tail >= 3 ? "dots_custom" : "dots_custom dotT12") : tail >= 3 ? "dots_custom dot1" : "dots_custom dotT12 dot1"}
                    >
                        {inPincom}
                    </Slider>
                </div>
            )}
        </div>
    );
});

export default React.memo(Pincom);
