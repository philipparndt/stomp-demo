import React, { useEffect, useState } from 'react'
import { Client } from '@stomp/stompjs'
import { v4 as uuidv4 } from 'uuid'
import { useSubscribe, Subscribe } from "use-subscribe"
import { interval, Subject, Observable } from "rxjs"

type Msg = {
    id: string
    body: string
}

const intCounter = interval(1000);

var emitter: { next: (arg0: string) => void };
const observable = Observable.create((e: any) => emitter = e);

function StompDemo() {
    const [client, setClient] = useState<Client | undefined>(undefined)
    const [messages, setMessages] = useState<Msg[]>([])
    const obsCount = useSubscribe(intCounter, 0);
    const s = useSubscribe(observable, 0);

    useEffect(() => {
        if (client) {
            const subscription = client.subscribe("/topic/general", message => {
                emitter.next(message.body);
                // setMessages([...messages, {id: uuidv4(), body: message.body}])
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
            for (let i = 0; i < 10; i++) {
                client.publish({destination: '/topic/general', body: `Hello world ${i} ${uuidv4()}` });
            }
        }}>Send</button>
    }
    else {
        sendButton = <p>no client available.</p>
    }

    const messageList = messages.map(message => <li key={message.id}>{message.body}</li>)

    return (
        <>
        <div>{s}</div>
        <div>tick: {obsCount}</div>
        <div>Stomp! {sendButton}</div>
        <div>{messageList}</div>
        </>
    )
}

export default StompDemo
