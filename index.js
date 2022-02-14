import * as https from "https";
import "dotenv/config";
import { MongoClient } from "mongodb";

let client = null;

MongoClient.connect(
  process.env.MONGODB_DATABASE_STRING,
  function (err, client) {
    if (err) throw err;
    console.log("Database is connected");
    var client = client;

    //      db.listCollections({ name: "current_quotes_array" }).toArray(function(err, collections) {
    //     if (err) throw err;
    //     if (collections.length === 0) {
    //         await getQuotesAndStoreInCurrentQuotesArray(db);
    //     }
    // });
  }
);

let db = client.db(process.env.MONGODB_DATABASE_NAME);

const getQuotesAndStoreInCurrentQuotesArray = async (db) => {
  getQuote().then((quotes) => {
    quotes = JSON.parse(quotes);
    //insert all in current_quotes_array
    db.collection("current_quotes_array").insertMany(
      quotes,
      function (err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
      }
    );
  });
};

function getQuote() {
  return new Promise((resolve, reject) => {
    https.get(process.env.API_URL, (res) => {
      let body = "";
      res.on("data", (chunk) => {
        body += chunk;
      });
      res.on("end", () => {
        resolve(body);
      });
    });
  });
}

client.close();