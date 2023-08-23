import { createContext, useState } from "react";

export const commentIdContext = createContext(null);

export function CommentIdProvider({ children }) {
    const scrollMemoryState = useState(null);
    return <commentIdContext.Provider value={scrollMemoryState}>{children}</commentIdContext.Provider>;
}
