import React, { useEffect, useState } from 'react'
import { Client } from '@stomp/stompjs'
import { v4 as uuidv4 } from 'uuid'

type Msg = {
    id: string
    body: string
}

function StompDemo() {
    const [client, setClient] = useState<Client | undefined>(undefined)
    const [messages, setMessages] = useState<Msg[]>([])

    useEffect(() => {
        if (client) {
            const subscription = client.subscribe("/topic/general", message => {
                console.log(messages)
                setMessages([...messages, {id: uuidv4(), body: message.body}])
            })

            return () => subscription.unsubscribe()
        }
    }, [client, messages])

    useEffect(() => {
        const client = new Client({
            brokerURL: "ws://localhost:61614",
            connectHeaders: {
            },
            debug: function (str: string) {
              console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000
          })

          client.onConnect = function(frame) {
            setClient(client)
          }
          
          client.onStompError = function (frame) {
            console.log('Broker reported error: ' + frame.headers['message']);
            console.log('Additional details: ' + frame.body);
          }
          
          client.activate()

          return () => client.deactivate()
    },[])

    let sendButton
    if (client) {
        sendButton = <button onClick={e => {
            client.publish({destination: '/topic/general', body: `Hello world ${uuidv4()}` });
        }}>Send</button>
    }
    else {
        sendButton = <p>no client available.</p>
    }

    const messageList = messages.map(message => <li key={message.id}>{message.body}</li>)

    return (
        <>
        <div>Stomp! {sendButton}</div>
        <div>{messageList}</div>
        </>
    )
}

export default StompDemo
