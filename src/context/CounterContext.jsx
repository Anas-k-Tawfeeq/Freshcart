import { createContext, useState } from "react";

export const CounterContext = createContext();

export function CounterContextProvider({ children }) {
    const [counter, setCounter] = useState(0);

    function increment() {
        setCounter(counter + 1);
    }

    return (
        <CounterContext.Provider value={{ counter, increment, setCounter }}>
            {children}
        </CounterContext.Provider>
    );
} 