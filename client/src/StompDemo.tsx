import React, { useEffect } from "react"
import { useSubscribe } from "use-subscribe"
import { interval, Observable } from "rxjs"
import {useStompClient} from "./stomp/useStompClient";

const intCounter = interval(100)

let emitter: { next: (arg0: string) => void }
const observable = new Observable<string>(subscriber => (emitter = subscriber));

function StompDemo() {
    const obsCount = useSubscribe(intCounter, 0)
    const current = useSubscribe(observable, "0")

    const client = useStompClient();

    useEffect(() => {
        const subscription = client.subscribe("/topic/general", (message) => {
            emitter.next(message.body)
        })

        return () => subscription.unsubscribe()
    }, [client])

    return (
        <>
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-start">
                    <div className="navbar-item">
                        <div className="buttons">
                            <button
                                className="button is-primary"
                                onClick={(e) => {
                                    if (client) {
                                        client.publish({
                                            destination: "/topic/general",
                                            body: `${obsCount}`
                                        })
                                    }
                                }}
                            >
                                <strong>Publish message</strong>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="container">
                <div className="notification">
                    <table className="table is-bordered is-striped is-narrow is-hoverable">
                        <thead>
                            <tr>
                                <th>Property</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Tick</td>
                                <td>{obsCount}</td>
                            </tr>
                            <tr>
                                <td>Received</td>
                                <td>{current}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default StompDemo
