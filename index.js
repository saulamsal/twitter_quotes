const http = require("https");

function getQuote() {
    return new Promise((resolve, reject) => {
        http.get("https://zenquotes.io/api/quotes", (res) => {
            let body = "";
            res.on("data", (chunk) => {
                body += chunk;
            }
            );
            res.on("end", () => {
                resolve(body);
            });
        });
    });
}

//get quote and console log it
getQuote().then((quotes) => {
     quotes = JSON.parse(quotes);
    console.log(quotes[0]);
    
}
);


