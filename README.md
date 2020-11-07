#Your Network

Your Network is set of

- API - A Rest API server using Express.js, MongoDB and bunch of npm packages.
- Front-end - A React.js front-end with well creafted design.

## Setup

### Required

    - Node.js - You are required to install Node.js
    - MongoDB - Local install of mongodb would work if not change the db setting in .dev file in api

### Dependencies

    Here there are two servers
    - API - Serves as Backend Server which does processing at server
    - Front-end - Serves React.js App which runs at client side
    Go to both of these folders and run
    ```
    npm install
    ```

### Start

    To start server use
    ```
    npm start
    ```
    in both folders where
    - Api server use 5000 port
    - Front-end server use 3000 port
    To acces app in browser type
    ```
    http://localhost:3000
    ```

## Performance

With current system we are required to read 70% of time and write for 30%. So, Let's assure 7:3 read to write ratio.

Now we already have seprate user data and user realations. So, even if we consider addition user information which will extent to 500kb per user considering relations as well in near future and with 1M users.
We will require nearly 500GB of disk space. So, one server could hold that much amount of space.
Also for increasing performance we could have multiple replica sets which accept read request to reduce reading loads. As only master DB will accept write request.

To further extend data capacity we could possibly use Consistent Hashsing which will randomly distribute users in different partitions along side also do same with relations collection as well.

Now for searcing user based on name would require us to use trie structure which can easily saved into mongodb collections (in case cache goes down) or cache. So we could easily find user data location in database.
