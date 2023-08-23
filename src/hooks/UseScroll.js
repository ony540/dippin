import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import debounce from "../utils/debounce";
import useCommentIdState from "./useCommentIdState";
import { scrollMemoryContext } from "../context/scrollMemoryContext";

export default function useScroll(tabRef) {
    const { pathname } = useLocation();
    const [scrollMemory, setScrollMemory] = useContext(scrollMemoryContext);
    const [commentId] = useCommentIdState();

    const handleSetScrollY = debounce(() => {
        setScrollMemory({ ...scrollMemory, [pathname]: document.documentElement.scrollTop || window.scrollY });
    }, 500);

    useEffect(() => {
        window.addEventListener("scroll", handleSetScrollY);
        return () => {
            window.removeEventListener("scroll", handleSetScrollY);
        };
    });

    useEffect(() => {
        if (pathname === "/") {
            window.scrollTo(0, scrollMemory[pathname]);
        } else {
            window.scrollTo(0, 0);
        }
    }, []);

    useEffect(() => {
        if (pathname === "/" && tabRef.current[commentId]) {
            //commentId를 가진 tabRef가 보이도록 이동
            console.log(tabRef.current[commentId]);
            tabRef.current[commentId].scrollIntoView({ block: "center" });
        }
    }, [commentId]);
}
