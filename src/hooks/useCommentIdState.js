import { useContext } from "react";
import { commentIdContext } from "../context/commentIdContext";

export default function useCommentIdState() {
    const value = useContext(commentIdContext);
    if (value === undefined) {
        throw new Error("useCommentIdState should be used within CommentIdProvider");
    }
    return value;
}
