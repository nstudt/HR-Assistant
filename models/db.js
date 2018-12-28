var mongoose = require("mongoose");

// Build the connection string
//const dbPW = process.env.MONGO_ATLAS_PW; //production
const dbPW = "asdf1234"; //dev
const dbURI = 'mongodb://192.168.254.108:27017/test';

//const dbURI =
//  "mongodb://admin:asdf1234@cluster0-shard-00-00-fkqew.mongodb.net:27017,cluster0-shard-00-01-fkqew.mongodb.net:27017,cluster0-shard-00-02-fkqew.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";

// Create the database connection
module.exports.dbconnect = (con) => {
    console.log(mongoose.connection.readyState);
  if (con == true) {
    mongoose.connect(dbURI, {useMongoClient: true});
      console.log('trying connection');
      console.log(mongoose.connection.readyState);
  }
  else if (con == false) {
      mongoose.connection.close();
      console.log('closing connection')
      console.log(mongoose.connection.readyState);
  }
  

  // CONNECTION EVENTS
  // When successfully connected
  mongoose.connection.on("connected", function() {
    console.log("Mongoose default connection open to " + dbURI);
      console.log(mongoose.connection.readyState);
  });

  // If the connection throws an error
  mongoose.connection.on("error", function(err) {
    console.log("Mongoose default connection error: " + err);
      console.log(mongoose.connection.readyState);
  });

  // When the connection is disconnected
  mongoose.connection.on("disconnected", function() {
    console.log("Mongoose default connection disconnected");
      console.log(mongoose.connection.readyState);
  });

  // If the Node process ends, close the Mongoose connection
  process.on("SIGINT", function() {
    mongoose.connection.close(function() {
      console.log(
        "Mongoose default connection disconnected through app termination"
      );
      process.exit(0);
        console.log(mongoose.connection.readyState);
    });
  });
};

// BRING IN YOUR SCHEMAS & MODELS // For example
require("./../models/company");


