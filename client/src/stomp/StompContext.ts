import React from 'react';
import { createContext } from "react"
import { Client } from "@stomp/stompjs"

export interface StompContextValue {
    client?: Client
    renderPromises?: Record<any, any>
}

let apolloContext: React.Context<StompContextValue>

export function getStompContext() {
    if (!apolloContext) {
        apolloContext = createContext<StompContextValue>({})
    }
    return apolloContext;
}

export function resetStompContext() {
    apolloContext = createContext<StompContextValue>({})
}
