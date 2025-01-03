# Transact Backend

## How to run locally

1. Make a .env file and follow the instructions in the .env file to fill out all required variables:

```
cp .env.example .env
```

2. Start the server using the following command

```
go run server.go
```

3. Your server is up and running. You can try pinging the server. In the following command, make sure to replace `{PORT}` with the port you defined in your `.env`. If you did not set one, replace `{PORT}` with 8080.

```
curl localhost:{PORT}/ping
```
