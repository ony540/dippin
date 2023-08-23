import React, { useState, useEffect } from "react";
import { dbService } from "../fbase";
import { doc, updateDoc } from "firebase/firestore";
import HeartImg1 from "../img/icon/heart1.png";
import HeartImg2 from "../img/icon/heart2.png";
import HeartImg3 from "../img/icon/heart3.png";

function Like({ pincom, isOwner }) {
    const [like, setLike] = useState(false);
    const [lnum, setLnum] = useState(pincom.likeN);
    const likeNRef = doc(dbService, "comments", `${pincom.id}`);

    useEffect(() => {
        updateDoc(likeNRef, {
            likeN: lnum,
        });
    }, [likeNRef, lnum]);

    const onLike = (e) => {
        e.stopPropagation();
        if (!like) {
            setLnum((lnum) => lnum + 1);
        } else {
            setLnum((lnum) => lnum - 1);
        }
        setLike(!like);
    };

    return (
        <div className="like" style={{ height: "17px" }}>
            <div onClick={onLike} style={{ width: "16px", height: "16px", margin: "0px 3px 0 0" }}>
                <img src={like ? HeartImg2 : isOwner ? HeartImg3 : HeartImg1} alt="heart" />
            </div>
            <div className="num1" style={{ lineHeight: "17px" }}>
                {pincom.likeN}{" "}
            </div>
        </div>
    );
}

export default Like;
