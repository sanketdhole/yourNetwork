# Your Network

Your Network is set of

- API - A Rest API server using Express.js, MongoDB and bunch of npm packages.
- Front-end - A React.js front-end with well creafted design.

## Setup

### Required
- Node.js - You are required to install Node.js
- MongoDB - Local install of mongodb would work if not change the db setting in .dev file in api

### Dependencies

Here there are two servers
- API - Serves as Backend Server which does processing at server side.
- Front-end - Serves React.js App which runs at client side.

Both of servers require seperate dependencies. You can install using below command. 
```
npm install
```
It is required to install dependencies independenly.

### Start

To start server use
```
npm start
```
in both folders where
- Api server use 5000 port
- Front-end server use 3000 port

To access app in browser type
```
http://localhost:3000
```

## Performance

### Scale for 1M user
With current system we are required to read 70% of time and write for 30%. So, Let's assume 7:3 read to write ratio.

Now we already have seprate user data and user realations. So, even if we consider addition user information which will extent to 500kb per user, considering relations as well, in near future and with 1M users.
We will require nearly 500GB of disk space. So, one server could hold that much amount of space.
Also for increasing performance we could have multiple replica sets which accept read request to reduce reading loads. As only master DB will accept write request.

### Increase Data Storage Capacity
To further extend data capacity we could possibly use Consistent Hashsing which will randomly distribute users in different partitions along side, do same with relations collection as well.

Now for searcing user based on name would require us to use trie structure which can easily saved into mongodb collections (in case cache goes down) or cache. So we could easily find user data location in database. As searcing whole DB for name would reduce performance drastically.

Also finding realtions between users would require to store lot of data on single machine. Which is not fesible. So, we could associate machine id with user such that data proceessing required for that user is done in associate machine. 
Again to reduce failure rate when any of those machine goes down we could have backup machines which could take their place with same machine ids.

### Load Balancing
We could have multiple load balancers between
- Client and Application Server
- Application Server and database

