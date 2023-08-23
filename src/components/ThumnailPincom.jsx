import React from "react";
import pin2Icon from "../img/pin2.png";

export default function ThumnailPincom({ mLoc }) {
    return (
        <div className="thumpincom_box">
            <div className="pin" style={{ gridColumn: mLoc.x, gridRow: mLoc.y }}>
                <img src={pin2Icon} alt="pin2" />
            </div>
        </div>
    );
}
