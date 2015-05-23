
**API Boilerplate**
==================
This is a boilerplate for my own needs.  Use at your own risk.  Improve it if you like it. 

Yes there are many options out there for getting started efficiently with a REST api.  I just took my own api, and stripped out anything not generic. 

My next step is adding 

Uses:
 - Node.js
 - Express.js
 - MongoDB
 - Socket.io
 - JWT (json web tokens)


## Local install / build / run ##
**Install Node Dependancies** (root directory)

    $ npm install

**Run in Development:**  

    $ npm run dev

**Configure:**

3 files for configuration depending on your environment.  
- /config/development.js
- /config/testing.js
- /config/production.js

Update the info in these to configure your server, port, database, cookie.


**Caveats**

- I make no claim that this is all that secure,
- I am using express-sanitized to sanitize all input and simple JWT for token security.  It's up to you to go beyond that. 
- I'm using underscore simply because the latest release of express-sanitized forgot to include it as it's dependancy.  If that changes you can remoe underscore if you want.