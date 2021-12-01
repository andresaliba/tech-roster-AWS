let express = require("express");
let cors = require('cors');
let path = require('path');
let MongoClient = require("mongodb").MongoClient;
let util= require('util');
let encoder = new util.TextEncoder('utf-8');

// MongoDB constants
const URL = "mongodb://mongo:27017/";
const DB_NAME = "dbTechs";

// construct application object via express
let app = express();
// add cors as middleware to handle CORs errors while developing
app.use(cors());
// get absolute path to /build folder (production build of react web app)
const CLIENT_BUILD_PATH = path.join(__dirname, "./../../client/build");
// adding middleware to define static files location
app.use("/", express.static(CLIENT_BUILD_PATH));

app.get("/get", async (request, response) => {
    // construct a MongoClient object, passing in additional options
    let mongoClient = new MongoClient(URL, { useUnifiedTopology: true });
    
    try {
        await mongoClient.connect();
        // get reference to database via name
        let db = mongoClient.db(DB_NAME);
        let techArray = await db.collection("technologies").find().sort("name",1).toArray();
        let json = { "technologies": techArray };
        // let json = { "technologies": [] };
        // serializes sampleJSON to string format
        response.send(json);
        mongoClient.close();
    } catch (error) {
        console.log(`>>> ERROR : ${error.message}`);
    }  
});

app.get("/course/:code", async (request, response) => {
    // get URL parameter
    let code = request.params.code;

    let mongoClient = new MongoClient(URL, { useUnifiedTopology: true });
    try {
        await mongoClient.connect();
        // get reference to database via name
        let db = mongoClient.db(DB_NAME);
        // get all documents of technologies collection (chained approach)
        let cursor = db.collection("technologies").find({"courses.code": code}).project({"_id": false, "courses": false}).sort("name",1);
        // convert cursor to array to return as response
        let techArray = await cursor.toArray();
        // close database and all connections
        mongoClient.close();
        let json = { "technologies": techArray };
        // serializes sampleJSON to string format
        response.send(json);
    } catch(error) {
        console.log(`>>> ERROR : ${error.message}`);
    }
});

// wildcard to handle all other non-api URL routings and point to index.html
app.use((request, response) => {
    response.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
});

app.listen(8080, () => console.log("Listening on port 8080"));