# ToDo Desk

KANBAN desk with 2 mode
 - for unauthorised user save data in local-storage
 - for authorised user save in DB (MySql)

Inspired by https://github.com/KelvinQiu802/kanban-react.git

## Live <a src="http://kanban.onyanov.net/">DEMO</a>

## Stack

server
- Node.js
- Express.js
- mysql2

client
- React.js
- React Bootstrap
- axios
- mobx

## Quickstart

### Server
1. Create file /server/.env

PORT=5000
DB_USER=***
DB_PASS=***
DB_HOST=localhost
DB_NAME=***
DB_PORT=
ADMIN_PASS=password
SECRET_KEY=superPASSWORDkey
TOKEN_DURATION=24h

2. Go to the server directory
```bash
  cd server
```
3. Install dependencies
```bash
  npm install
```
4. Start the server
```bash
  npm start
```

### Client
1. Go to the client directory
```bash
  cd my-project
```
2. Install dependencies
```bash
  npm install
```
3. Start the server
```bash
  npm start
```