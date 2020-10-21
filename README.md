# Stomp demo

This is a small demo to test communication between a ActiveMQ message broker and a React App.

Build using `docker-compose build`, start using `docker-compose up`.

| Port                          | Description     |
| ----------------------------- | --------------- |
| [8081](http://localhost:8081) | Web UI          |
| [8161](http://localhost:8161) | ActiveMQ Web UI |
| 61614                         | Websocket       |
| 1883                          | MQTT            |

The ActiveMQ web UI is using a default configuration with default user (admin/admin). 
This project is just for demo purpose, do not use this in a production environment.

# Development
Start the client using `npm start` in client folder.
