import React from 'react';
import { createContext } from "react"
import { Client } from "@stomp/stompjs"

export interface StompContextValue {
    client?: Client
    renderPromises?: Record<any, any>
}

let context: React.Context<StompContextValue>

export function getStompContext() {
    if (!context) {
        context = createContext<StompContextValue>({})
    }
    return context;
}

export function resetStompContext() {
    context = createContext<StompContextValue>({})
}
