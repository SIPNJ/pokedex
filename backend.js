const fs = require("fs");
const http = require("http");
const url = require("url");
const path = require("path");
const fetch = require("node-fetch");
const backendFunction = require("../../../backend-function/pokedex");
const host = "localhost";
const port = 9090;

// Finish
async function onRequest(request, response) {
  // console.log(request.url)
  let pathname = url.parse(request.url, true).pathname;
  let filename = "." + pathname;
  // query
  let query;
  let namePokemon;
  // numberID
  let numberID;
  let quantity;
  if (pathname.match(/\/pokedict/gi)) {
    query = new URL(request.url, `http://${request.headers.host}`);
    pathname = "/pokedict";
    namePokemon = query.searchParams.get("name");
  } else if (pathname.match(/\/pokesdict/gi)) {
    query = new URL(request.url, `http://${request.headers.host}`);
    pathname = "/pokesdict";
    numberID = query.searchParams.get("numberID");
    quantity = query.searchParams.get("quantity");
  }
  // switch case
  if (pathname == "/") {
    // ORIGIN - INDEX.HTML
    fs.readFile("./index.html", "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        response.end(JSON.stringify({ message: "Do not have file !" }));
      } else {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
        response.end();
      }
    });
  } else if (pathname.includes(`.html`) == true) {
    // HOME
    fs.readFile(filename, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        response.end(JSON.stringify({ message: "Do not have file !" }));
      } else {
        // response.header("Access-Control-Allow-Origin", "*");
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
        response.end();
      }
    });
  } else if (pathname.includes(`.css`) == true) {
    // CASCADING STYLE SHEET
    fs.readFile(filename, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        response.end(JSON.stringify({ message: "Do not have file !" }));
      } else {
        response.writeHead(200, { "Content-Type": "text/css" });
        response.write(data);
        response.end();
      }
    });
  } else if (pathname.includes(`.js`) == true) {
    // JAVASCRIPT
    fs.readFile(filename, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        response.end(JSON.stringify({ message: "Do not have file !" }));
      } else {
        response.writeHead(200, { "Content-Type": "text/js" });
        response.write(data);
        response.end();
      }
    });
  } else if (pathname.includes(`/pokedict`) == true) {
    // Pokedex
    if (namePokemon == "") {
      response.end(JSON.stringify({ message: "You should not leave blank !" }));
    } else {
      await backendFunction.getDataPokemonName(namePokemon).then((data) => {
        return response.end(
          JSON.stringify({
            name: data.name,
            img: data.img,
            stat: data.stats,
            id: data.id,
            evolution: data.evolution,
          })
        );
      });
    }
  } else if (pathname.includes(`/pokesdict`) == true) {
    backendFunction.getDataPokemonNumbers(numberID, quantity).then((data) => {
      response.end(JSON.stringify(data));
    });
  } else {
    response.end(
      JSON.stringify({ message: `Do not have file at ${filename} !` })
    );
  }
}
const server = http.createServer(onRequest);
server.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}/pokedex.html`);
});
