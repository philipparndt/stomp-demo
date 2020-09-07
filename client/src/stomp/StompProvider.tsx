import React, {useEffect, useState} from 'react';
import { invariant } from 'ts-invariant';
import {getStompContext} from "./StompContext";
import {Client} from "@stomp/stompjs";

export interface StompProviderProps {
    client: Client
    children: React.ReactNode | React.ReactNode[] | null
}

export const StompProvider: React.FC<StompProviderProps> = ({
                                                                client,
                                                                       children
                                                                   }) => {
    const [connectedClient, setConnectedClient] = useState<Client | undefined>(undefined)
    const StompContext = getStompContext();

    useEffect(() => {
        client.onConnect = function (frame) {
            setConnectedClient(client)
        }

        client.onStompError = function (frame) {
            console.log("Broker reported error: " + frame.headers["message"])
            console.log("Additional details: " + frame.body)
        }

        client.activate()

        return () => client.deactivate()
    }, [client])

    if (connectedClient) {
        return (
            <StompContext.Consumer>
                {(context: any = {}) => {
                    if (client && context.client !== client) {
                        context = Object.assign({}, context, { client });
                    }

                    invariant(
                        context.client,
                        'StompProvider was not passed a client instance. Make ' +
                        'sure you pass in your client via the "client" prop.'
                    );

                    return (
                        <StompContext.Provider value={context}>
                            {children}
                        </StompContext.Provider>
                    );
                }}
            </StompContext.Consumer>
        );
    }
    else {
        return <div>Connecting...</div>
    }
};