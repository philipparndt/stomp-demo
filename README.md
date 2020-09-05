# Stomp demo

This is a small demo to test communication between a ActiveMQ message broker and a React App.

Start the server using `docker-compose up` in server folder. It will expose three ports:
- locahost:8161 as web interface
- localhost:61614 websocket using stomp
- localhost:1883 mqtt

Start the client using `npm start` in client folder.