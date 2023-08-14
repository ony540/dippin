import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./Auth";
import Toon from "./Toon";
import Allcom from "./Allcom";
import UseScroll from "../hooks/UseScroll";

function AppRouter({ isLoggedIn, userObj, comments, scrollY, setScrollY, refId, setRefId, tabRef, show, setShow }) {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <UseScroll scrollY={scrollY} refId={refId} tabRef={tabRef} />
            <div>
                <Routes>
                    {isLoggedIn ? (
                        <>
                            <Route
                                exact
                                path="/"
                                element={
                                    <Toon
                                        userObj={userObj}
                                        comments={comments}
                                        scrollY={scrollY}
                                        setScrollY={setScrollY}
                                        refId={refId}
                                        tabRef={tabRef}
                                        setRefId={setRefId}
                                        show={show}
                                        setShow={setShow}
                                    />
                                }
                            />
                            <Route exact path="/allcomment" element={<Allcom userObj={userObj} comments={comments} setRefId={setRefId} setShow={setShow} />} />
                            <Route exact path="/auth" element={<Auth />} />
                        </>
                    ) : (
                        <Route exact path="/" element={<Auth />} />
                    )}
                </Routes>
            </div>
        </Router>
    );
}

export default AppRouter;
