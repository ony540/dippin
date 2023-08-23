import React, { useEffect, useMemo, useState } from "react";
import { throttle } from "lodash";

export default function useNavigationShow(flow) {
    //스크롤 감지
    const [scrollPosition, setScrollPosition] = useState(0);
    const { scrollHeight } = document.documentElement;
    const inHeight = scrollHeight - window.innerHeight;
    const [isOnGrid, setIsOnGrid] = useState(false);
    const [navShow, setNavShow] = useState(false);

    //toon에서 스크롤을 감지하면 없애기
    const onScroll = useMemo(
        () =>
            throttle(() => {
                setScrollPosition(document.documentElement.scrollTop || window.scrollY);
                setIsOnGrid(scrollPosition >= inHeight - 200);
                if (flow < 1) setNavShow(false);
            }, 800),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [flow]
    );

    //스크롤이 맨위거나 맨 밑이면 생기기
    useEffect(() => {
        if (scrollPosition <= 10 || scrollPosition >= inHeight - 2) {
            setNavShow(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrollPosition]);

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    });
    return [navShow, setNavShow, isOnGrid];
}
