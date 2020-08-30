// const mypackage = require("/pokedex/mypackage");
const fs = require("fs");
const http = require("http");
const url = require("url");
const path = require("path");
const host = "localhost";
const port = 31415;
const backendPokedex = require("./backend-function/pokedex");

async function onRequest(request, response) {
  let pathname = url.parse(request.url, true).pathname.replace(/%20/gi, " ");
  let filename = "." + pathname;
  // console.log(pathname);
  // query
  let query;
  // pokedex
  let namePokemon;
  let favorite_pokemon;
  // numberID
  let numberID;
  let quantity;
  // login & logup
  let email, username, password, month, year;
  if (pathname.match(/\/login/gi)) {
    query = new URL(request.url, `http://${request.headers.host}`);
    pathname = "/login";
    username = query.searchParams.get("username");
    password = query.searchParams.get("password");
  } else if (pathname.match(/\/logup/gi)) {
    query = new URL(request.url, `http://${request.headers.host}`);
    pathname = "/logup";
    email = query.searchParams.get("email");
    username = query.searchParams.get("username");
    password = query.searchParams.get("password");
    month = query.searchParams.get("month");
    year = query.searchParams.get("year");
  } else if (pathname.match(/\/pokedict/gi)) {
    query = new URL(request.url, `http://${request.headers.host}`);
    pathname = "/pokedict";
    namePokemon = query.searchParams.get("name");
  } else if (pathname.match(/\/pokesdict/gi)) {
    query = new URL(request.url, `http://${request.headers.host}`);
    pathname = "/pokesdict";
    numberID = query.searchParams.get("numberID");
    quantity = query.searchParams.get("quantity");
  } else if (pathname.match(/\/favoritePokemon/gi)) {
    query = new URL(request.url, `http://${request.headers.host}`);
    pathname = "/favoritePokemon";
  } else if (pathname.match(/\/ActiveFavoritePokemon/gi)) {
    query = new URL(request.url, `http://${request.headers.host}`);
    pathname = "/ActiveFavoritePokemon";
    favorite_pokemon = query.searchParams.get("favPoke");
  } else if (pathname.match(/\/DeactiveFavoritePokemon/gi)) {
    query = new URL(request.url, `http://${request.headers.host}`);
    pathname = "/DeactiveFavoritePokemon";
    favorite_pokemon = query.searchParams.get("favPoke");
  }
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
  } else if (pathname.includes(`.png`) == true) {
    // IMAGES - PNG
    fs.readFile(filename, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        response.end(JSON.stringify({ message: "Do not have file !" }));
      } else {
        response.writeHead(200, { "Content-Type": "image/png" });
        response.write(data);
        response.end();
      }
    });
  } else if (
    pathname.includes(`.jpg`) == true ||
    pathname.includes(`.jpeg`) == true
  ) {
    // IMAGES - JPG - JPEG
    fs.readFile(filename, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        response.end(JSON.stringify({ message: "Do not have file !" }));
      } else {
        response.writeHead(200, { "Content-Type": "image/jpeg" });
        response.write(data);
        response.end();
      }
    });
  } else if (pathname.includes(`/login`) == true) {
    // LOG IN
    if (username == "" || password == "") {
      response.end(JSON.stringify({ message: "You should not leave blank !" }));
    } else {
      let ispass = JSON.parse(
        fs.readFileSync("stunary/account/ispass.json", "utf-8")
      );
      for (let i = 0; i < ispass.length; i++) {
        if (username == ispass[i].username && password == ispass[i].password) {
          console.log(ispass[i].username);
          return response.end(
            JSON.stringify({ message: "Login Success", username: username })
          );
        }
      }
      return response.end(JSON.stringify({ message: "Login Fail" }));
    }
  } else if (pathname.includes(`/logup`) == true) {
    // LOG UP
    if (
      email == "" ||
      username == "" ||
      password == "" ||
      month == "" ||
      year == ""
    ) {
      response.end(JSON.stringify({ message: "You should not leave blank !" }));
    } else {
      let ispass = fs
        .readFileSync("stunary/account/ispass.json", "utf-8")
        .replace(`\n]`, `,`);
      fs.writeFileSync(
        "stunary/account/ispass.json",
        `${ispass}\n{\n"email": "${email}",\n"username": "${username}",\n"password": "${password}",\n"month": "${month}",\n"year": "${year}"\n}\n]`,
        "utf-8"
      );
      return response.end(JSON.stringify({ message: "Finish Sign Up !" }));
    }
  } else if (pathname.includes(`/pokedict`) == true) {
    // Pokedex
    if (namePokemon == "") {
      response.end(JSON.stringify({ message: "You should not leave blank !" }));
    } else {
      await backendPokedex.getDataPokemonName(namePokemon).then((data) => {
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
    // View more for pokedex
    backendPokedex.getDataPokemonNumbers(numberID, quantity).then((data) => {
      response.end(JSON.stringify(data));
    });
  } else if (pathname.includes(`/favoritePokemon`) == true) {
    // Read Favorite for pokedex
    let favorite_pokemons_data = fs.readFileSync(
      "favorite_pokemon.json",
      "utf-8"
    );
    return response.end(
      JSON.stringify({ favorite_pokemons_data: favorite_pokemons_data })
    );
  } else if (pathname.includes(`/ActiveFavoritePokemon`) == true) {
    // Create Favorite for pokedex
    let favorite_pokemons_data = fs.readFileSync(
      "favorite_pokemon.json",
      "utf-8"
    ).replace(`\n]`, ``);
    fs.writeFileSync(
      "favorite_pokemon.json",
      `${favorite_pokemons_data},\n{"name": "${favorite_pokemon}"}\n]`,
      "utf-8"
    );
    return response.end();
  } else if (pathname.includes(`/DeactiveFavoritePokemon`) == true) {
    // Delete Favorite for pokedex
    let favorite_pokemons_data = fs
      .readFileSync("favorite_pokemon.json", "utf-8")
      .replace(`{"name": "${favorite_pokemon}"},\n`, ``);
    fs.writeFileSync(
      "favorite_pokemon.json",
      favorite_pokemons_data,
      "utf-8"
    );
    console.log(favorite_pokemon);
    console.log(favorite_pokemons_data);
    return response.end();
  } else {
    response.end(
      JSON.stringify({ message: `Do not have file at ${filename} !` })
    );
  }
}
const server = http.createServer(onRequest);
server.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}/`);
});
