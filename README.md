# Poker Planning 98

## Description

This is a simple poker planning app, where you can create a room and invite your team to join it. Then you can start a planning session and vote for the story points of your user stories.

## How to run

If you want to do it painless, install Docker and Docker Compose and run the following command:

```bash
docker-compose up
```

Everything is prepared to be deployed. The only configuration left is to set the envvar `SOCKET_SERVER_URL` if you're not running the container locally (and open the port 3001).
