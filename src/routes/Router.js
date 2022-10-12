import React from "react";
import { BrowserRouter as Router,
    Route,Routes } from "react-router-dom";
import Auth from "./Auth";
import Toon from "./Toon";
import Allcom from "./Allcom";
import UseScrollMemo from "../hooks/UseScroll";

function AppRouter ({refreshUser, isLoggedIn, userObj, comments,scrollY}) {

    return <Router basename={process.env.PUBLIC_URL} >
        <UseScrollMemo />
    <div>
    <Routes>
        {isLoggedIn ? (
        <>
         <Route exact path="/" element={<Toon userObj={userObj} comments={comments} />}  />
         <Route exact path="/allcomment" element={<Allcom comments={comments} scrollY={scrollY} />}  />
        </>) : (
        <Route exact path="/" element={<Auth />} />
        )}

    </Routes>
    </div>
</Router>
} 

export default AppRouter;
