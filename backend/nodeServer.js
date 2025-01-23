const http = require("http");
const client = require("./client");
const dotenv = require("dotenv");
dotenv.config();

const host = "0.0.0.0";
const port = process.env.PORT || 8000;

const requestListener = function (req, res) {
  const url = req.url.split("/").splice(1);
  const method = req.method;

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*"); 
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); 
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); 
  res.setHeader("Content-Type", "application/json");

  
  if (method === "OPTIONS") {
    res.writeHead(204); 
    res.end();
    return;
  }

  if (url[0] === "search") {
    switch (method) {
      case "GET":
        if (url.length > 1 && url[1]) {
          client.getNews({ id: url[1] }, (error, news) => {
            if (error) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: error.message }));
              return;
            }
            res.end(JSON.stringify(news));
          });
        } else {
          client.getAllNews({}, (error, news) => {
            if (error) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: error.message }));
              return;
            }
            res.end(JSON.stringify(news));
          });
        }
        break;

      case "POST":
        let body = "";
        req.on("data", (chunk) => {
          body += chunk.toString(); 
        });
        req.on("end", () => {
          try {
            const parsedBody = JSON.parse(body); 
            client.searchQuestions(
              {
                query: parsedBody.query,
                page: parsedBody.page,
              },
              (error, news) => {
                if (error) {
                  res.statusCode = 500;
                  res.end(JSON.stringify({ error: error.message }));
                  return;
                }
                res.end(JSON.stringify({ data: news, msg: "Search completed." }));
              }
            );
          } catch (e) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: "Invalid JSON format" }));
          }
        });
        break;

      default:
        res.statusCode = 405;
        res.end(JSON.stringify({ error: "Method not allowed" }));
        break;
    }
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Not found" }));
  }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
