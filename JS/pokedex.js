// const { default: fetch } = require("node-fetch");

let hp = document.getElementById("hp");
let attack = document.getElementById("attack");
let defense = document.getElementById("defense");
let special_attack = document.getElementById("special-attack");
let special_defense = document.getElementById("special-defense");
let speed = document.getElementById("speed");
let pokemonName = document.getElementById("pokemonName");
let pokemonId = document.getElementById("pokemonId");
let pokemonImg = document.getElementById("pokemonImage");
let evolution_group = document.getElementById("evolution-group");
let pokemons_group = document.getElementById("pokemons-group");
// OVERLAY AND INFOPANEL
let overlay = document.getElementsByClassName("overlay")[0];
let infoPanel = document.getElementsByClassName("infoPanel")[0];
infoPanel.addEventListener("click", function () {
  overlay.classList.toggle("darken-background");
  infoPanel.classList.toggle("openPanel");
});
document.getElementById("btn").addEventListener("click", function () {
  let namePokemon = document.getElementById("name").value;
  pokemonInfo(namePokemon);
});
function pokemonInfo(thing) {
  while (evolution_group.firstChild) {
    evolution_group.removeChild(evolution_group.firstChild);
  }
  let query = `?name=${thing}`;
  fetch(`http://localhost:31415/pokedict${query}`)
    .then((response) => response.json())
    .then((response) => {
      // DISPLAY DATA
      pokemonName.innerHTML = response.name;
      pokemonId.innerHTML = response.id;
      pokemonImg.src = response.img;
      hp.innerHTML = response.stat[0].base_stat;
      attack.innerHTML = response.stat[1].base_stat;
      defense.innerHTML = response.stat[2].base_stat;
      special_attack.innerHTML = response.stat[3].base_stat;
      special_defense.innerHTML = response.stat[4].base_stat;
      speed.innerHTML = response.stat[5].base_stat;
      // CREATE DATA FOR CARD 1
      let row1 = document.createElement("div");
      row1.classList.add("row");
      let card1 = document.createElement("div");
      card1.classList.add("card");
      card1.classList.add("col-3");
      card1.classList.add("mx-auto");
      let card_img1_top = document.createElement("img");
      card_img1_top.classList.add("card-img-top");
      card_img1_top.src = response.evolution[0].image;
      let card1_body = document.createElement("div");
      card1_body.classList.add("card-body");
      let card1_text = document.createElement("div");
      card1_text.classList.add("card-text");
      card1_text.classList.add("mx-auto");
      card1_text.classList.add("text-center");
      card1_text.innerHTML = response.evolution[0].name;
      // POSITION OF CARD 1
      evolution_group.appendChild(row1);
      row1.appendChild(card1);
      card1.appendChild(card_img1_top);
      card1.appendChild(card1_body);
      card1_body.appendChild(card1_text);
      // CREATE DATA FOR CARD 2
      if (response.evolution[1].length !== 0) {
        let row2 = document.createElement("div");
        row2.classList.add("row");
        let card_to = document.createElement("div");
        card_to.classList.add("text-center");
        card_to.classList.add("mx-auto");
        card_to.classList.add("third0");
        card_to.innerHTML = "To";
        evolution_group.appendChild(card_to);
        for (let i = 0; i < response.evolution[1].length; i++) {
          // CREATE DATA FOR CARD 2
          let card2 = document.createElement("div");
          card2.classList.add("card");
          card2.classList.add("col-3");
          card2.classList.add("mx-auto");
          let card_img2_top = document.createElement("img");
          card_img2_top.classList.add("card-img-top");
          card_img2_top.src = response.evolution[1][i].image;
          let card2_body = document.createElement("div");
          card2_body.classList.add("card-body");
          let card2_text = document.createElement("div");
          card2_text.classList.add("card-text");
          card2_text.classList.add("mx-auto");
          card2_text.classList.add("text-center");
          card2_text.innerHTML = response.evolution[1][i].name;
          // POSITION OF CARD 2
          evolution_group.appendChild(row2);
          row2.appendChild(card2);
          card2.appendChild(card_img2_top);
          card2.appendChild(card2_body);
          card2_body.appendChild(card2_text);
        }
      }
      if (response.evolution[2].length !== 0) {
        let row3 = document.createElement("div");
        row3.classList.add("row");
        let card_to = document.createElement("div");
        card_to.classList.add("mx-auto");
        card_to.classList.add("text-center");
        card_to.classList.add("third0");
        card_to.innerHTML = "To";
        evolution_group.appendChild(card_to);
        for (let i = 0; i < response.evolution[2].length; i++) {
          // CREATE DATA FOR CARD 3
          let card3 = document.createElement("div");
          card3.classList.add("card");
          card3.classList.add("col-3");
          card3.classList.add("mx-auto");
          let card_img3_top = document.createElement("img");
          card_img3_top.classList.add("card-img-top");
          card_img3_top.src = response.evolution[2][i].image;
          let card3_body = document.createElement("div");
          card3_body.classList.add("card-body");
          let card3_text = document.createElement("div");
          card3_text.classList.add("card-text");
          card3_text.classList.add("mx-auto");
          card3_text.classList.add("text-center");
          card3_text.innerHTML = response.evolution[2][i].name;
          // POSITION OF CARD 3
          evolution_group.appendChild(row3);
          row3.appendChild(card3);
          card3.appendChild(card_img3_top);
          card3.appendChild(card3_body);
          card3_body.appendChild(card3_text);
        }
      }
      infoPanel.click();
    });
}
// FUNCTION CREATE TAGS
function createPokemonTags(numberID, quantity) {
  let maindatas = [];
  let query = `?numberID=${numberID}&quantity=${quantity}`;
  fetch(`http://localhost:31415/pokesdict${query}`)
    .then((data) => data.json())
    .then((data) => {
      maindatas = data;
      return maindatas;
    })
    .then((maindatas) => {
      for (let i = 0; i <= Number(quantity) - 1; i++) {
        // CREATE TAGS
        // pokemon-card
        let pokemon_card = document.createElement("div");
        pokemon_card.classList.add("pokemon_card");
        pokemon_card.classList.add("card");
        pokemon_card.classList.add("col-3");
        pokemon_card.classList.add("mx-auto");
        pokemon_card.classList.add("my-auto");
        pokemon_card.classList.add("bgthird1");
        pokemon_card.id = maindatas[i].name;
        // pokemon img
        let pokemon_img = document.createElement("img");
        pokemon_img.classList.add("card-img-top");
        pokemon_img.src = maindatas[i].img;
        // pokemon card body
        let pokemon_card_body = document.createElement("div");
        pokemon_card_body.classList.add("card-body");
        // pokemon number
        let pokemon_number = document.createElement("div");
        pokemon_number.classList.add("card-title");
        pokemon_number.classList.add("mx-auto");
        pokemon_number.classList.add("third0");
        pokemon_number.innerHTML = maindatas[i].id;
        // pokemon title
        let pokemon_title = document.createElement("div");
        pokemon_title.classList.add("card-title");
        pokemon_title.classList.add("mx-auto");
        pokemon_title.classList.add("third0");
        pokemon_title.classList.add("title2nd");
        pokemon_title.innerHTML = maindatas[i].name;
        pokemon_title.style.textTransform = `capitalize`;
        // RE-POSITION
        pokemons_group.appendChild(pokemon_card);
        pokemon_card.appendChild(pokemon_img);
        pokemon_card.appendChild(pokemon_card_body);
        pokemon_card_body.appendChild(pokemon_number);
        pokemon_card_body.appendChild(pokemon_title);
        pokemon_img.addEventListener("click", () => {
          pokemonInfo(maindatas[i].name);
        });
        // favorite
        if (keyLogin == null || keyLogin == "null") {
          console.log("haha");
        } else {
          let pokemon_favorite = document.createElement("i");
          pokemon_favorite.classList.add("far", "fa-heart");
          pokemon_favorite.id = `${maindatas[i].name}-favorite`;
          pokemon_card_body.appendChild(pokemon_favorite);
          pokemon_favorite.addEventListener("click", function () {
            let queries = `?favPoke=${pokemon_favorite.id}`;
            if (pokemon_favorite.classList.contains("fas")) {
              fetch(`http://localhost:31415/DeactiveFavoritePokemon${queries}`);
            } else if (pokemon_favorite.classList.contains("far")) {
              fetch(`http://localhost:31415/ActiveFavoritePokemon${queries}`);
            }
            pokemon_favorite.classList.toggle("far");
            pokemon_favorite.classList.toggle("fas");
          });
        }
      }
      fetch("http://localhost:31415/favoritePokemon")
        .then((data) => data.json())
        .then((data) => {
          let pokemon_favorite_data = data.favorite_pokemons_data
            .split("[")[1]
            .split("]")[0]
            .split(",");
          for (let i = 0; i < pokemon_favorite_data.length; i++) {
            document
              .getElementById(
                pokemon_favorite_data[i].split(`{"name": "`)[1].split(`"}`)[0]
              )
              .classList.toggle("far", false);
            document
              .getElementById(
                pokemon_favorite_data[i].split(`{"name": "`)[1].split(`"}`)[0]
              )
              .classList.toggle("fas", true);
          }
        });
    });
}
createPokemonTags(1, 8);

// VIEW MORE
document.getElementById("view-more").addEventListener("click", function () {
  let pokemon_card_quantity = document.getElementsByClassName("pokemon_card")
    .length;
  console.log(pokemon_card_quantity);
  createPokemonTags(pokemon_card_quantity + 1, 8);
});
