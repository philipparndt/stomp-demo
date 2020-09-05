# Stomp demo

This is a small demo to test communication between a ActiveMQ message broker and a React App.

Start the server using `docker-compose up` in server folder. It will expose three ports:

| Port                          | Description           |
| ----------------------------- | --------------------- |
| [8161](http://localhost:8161) | Web interface         |
| 61614                         | Websocket using stomp |
| 1883                          | MQTT                  |

The web UI is using a default configuration with default user (admin/admin). 
This project is just for demo purpose, do not use this in a production environment.

Start the client using `npm start` in client folder.