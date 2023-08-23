import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./Auth";
import Toon from "./Toon";
import Allcom from "./Allcom";

function AppRouter({ isLoggedIn, userObj, comments, tabRef, show, setShow }) {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route path="/" element={<Toon userObj={userObj} comments={comments} tabRef={tabRef} show={show} setShow={setShow} />} />
                        <Route exact path="/allcomment" element={<Allcom userObj={userObj} comments={comments} setShow={setShow} tabRef={tabRef} />} />
                    </>
                ) : (
                    <Route path="/" element={<Auth />} />
                )}
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
