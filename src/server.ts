const http = require('http');
const app = require('./app');
const {initializeData} = require('./models/planets.models');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const gate = "kkk";



async function startServer (){
    const res = await initializeData();
    console.log(res);
    server.listen(PORT, ()=> console.log(`running on port : ${PORT}`));
}

startServer();