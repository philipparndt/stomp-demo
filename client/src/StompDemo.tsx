import React, { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import { useSubscribe } from "use-subscribe";
import { interval, Observable } from "rxjs";

type Msg = {
  id: string;
  body: string;
};

const intCounter = interval(100);

var emitter: { next: (arg0: string) => void };
const observable = Observable.create((e: any) => (emitter = e));

function StompDemo() {
  const [client, setClient] = useState<Client | undefined>(undefined);
  const obsCount = useSubscribe(intCounter, 0);
  const current = useSubscribe(observable, 0);

  useEffect(() => {
    if (client) {
      const subscription = client.subscribe("/topic/general", (message) => {
        emitter.next(message.body);
      });

      return () => subscription.unsubscribe();
    }
  }, [client]);

  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://localhost:61614",
      connectHeaders: {},
      debug: function (str: string) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = function (frame) {
      setClient(client);
    };

    client.onStompError = function (frame) {
      console.log("Broker reported error: " + frame.headers["message"]);
      console.log("Additional details: " + frame.body);
    };

    client.activate();

    return () => client.deactivate();
  }, []);

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
                      body: `${obsCount}`,
                    });
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
  );
}

export default StompDemo;
