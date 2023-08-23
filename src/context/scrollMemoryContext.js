import { createContext, useState } from "react";

export const scrollMemoryContext = createContext();

export function ScrollMemoryProvider({ children }) {
    const scrollMemoryState = useState({});
    return <scrollMemoryContext.Provider value={scrollMemoryState}>{children}</scrollMemoryContext.Provider>;
}
