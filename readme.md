# How to execute application

## Requirements

* nodejs
* reactjs
* redis

## Local Installation

Init redis
```bash
redis-server /usr/local/etc/redis.conf
```

Init Backend
```bash
cd ripley
npm install
nodemon main.js
```

Init Frontend
```bash
cd ripleyapp
npm install
npm start
```

Application Heroku 
https://afternoon-beach-89828.herokuapp.com/

## License
[MIT](https://choosealicense.com/licenses/mit/)