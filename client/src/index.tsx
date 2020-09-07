import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bulma/css/bulma.css'
import {StompProvider} from "./stomp/StompProvider";
import {Client} from "@stomp/stompjs";

const client = new Client({
    brokerURL: "ws://localhost:61614",
    connectHeaders: {},
    debug: function (str: string) {
        console.log(str)
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 30000,
    heartbeatOutgoing: 30000
})

ReactDOM.render(
  <React.StrictMode>
      <StompProvider client={client}>
          <App />
      </StompProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
