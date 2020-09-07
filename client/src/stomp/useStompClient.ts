import { useContext } from "react"
import { Client } from "@stomp/stompjs"
import { invariant } from 'ts-invariant'
import {getStompContext} from "./StompContext"

export function useStompClient(): Client {
    const { client } = useContext(getStompContext())
    invariant(
        client,
        'No Stomp Client instance can be found. Please ensure that you ' +
        'have called `StompProvider` higher up in your tree.'
    );
    return client!
}