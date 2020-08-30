const fetch = require("node-fetch");
// GET EVOLUTION CHAINS
function getEvolutionChains(rawEvolution) {
  let evolution = [];
  let generation1 = [];
  let generation2 = [];
  let generation3 = [];
  evolution.push(rawEvolution.species);
  if (rawEvolution.evolves_to !== 0) {
    for (let i1 = 0; i1 < rawEvolution.evolves_to.length; i1++) {
      generation1.push(rawEvolution.evolves_to[i1].species);
      if (rawEvolution.evolves_to[i1].evolves_to !== 0) {
        for (
          let i2 = 0;
          i2 < rawEvolution.evolves_to[i1].evolves_to.length;
          i2++
        ) {
          generation2.push(rawEvolution.evolves_to[i1].evolves_to[i2].species);
          if (rawEvolution.evolves_to[i1].evolves_to[i2].evolves_to !== 0) {
            for (
              let i3 = 0;
              i3 < rawEvolution.evolves_to[i1].evolves_to[i2].evolves_to.length;
              i3++
            ) {
              generation3.push(
                rawEvolution.evolves_to[i1].evolves_to[i2].evolves_to[i3]
                  .species
              );
            }
          }
        }
      }
    }
  }
  evolution.push(generation1);
  evolution.push(generation2);
  evolution.push(generation3);
  return evolution;
}
// GET DATA FROM POKEMON NUMBER

/**
 * @returns {Array} an array of pokemons
 * @param {Number} numberID start pokemon
 * @param {Number} quantity quantity pokemon
 */
function getDataPokemonNumbers(numberID, quantity) {
  let array = [];
  for (let i = numberID; i <= +numberID + +quantity - 1; i++) {
    array.push(i);
  }
  let poke = array.map((value) => {
    return fetch(`http://pokeapi.co/api/v2/pokemon/${value}`)
      .then((data) => data.json())
      .then((data) => {
        // console.log(data)
        let formattedData = {
          name: data.name,
          stats: data.stats,
          img: data.sprites.other["official-artwork"].front_default,
          id: data.id,
        };
        return formattedData;
      });
  });
  return Promise.all(poke);
}

async function getDataPokemonName(namePokemon) {
  let maindata = {};
  let evolution;
  await fetch(`http://pokeapi.co/api/v2/pokemon/${namePokemon}`)
    .then((data) => data.json())
    .then((data) => {
      maindata.name = data.name;
      maindata.stats = data.stats;
      maindata.img = data.sprites.other["official-artwork"].front_default;
      maindata.id = data.id;
    });

  await fetch(`http://pokeapi.co/api/v2/pokemon-species/${namePokemon}`)
    .then((data) => data.json())
    .then(async(data) => {
      await fetch(data.evolution_chain.url)
        .then((data) => data.json())
        .then((data) => {
          return data.chain;
        })
        .then((data) => {
          maindata.evolution = getEvolutionChains(data);
          return maindata.evolution;
        })
      return maindata.evolution;
    })
  // GET IMAGE FROM POKEMON NAME
  await fetch(`http://pokeapi.co/api/v2/pokemon/${maindata.evolution[0].name}`)
    .then((data) => data.json())
    .then((data) => {
      maindata.evolution[0].image =
        data.sprites.other["official-artwork"].front_default;
    });
  for (let i = 0; i < maindata.evolution[1].length; i++) {
    await fetch(
      `http://pokeapi.co/api/v2/pokemon/${maindata.evolution[1][i].name}`
    )
      .then((data) => data.json())
      .then((data) => {
        maindata.evolution[1][i].image =
          data.sprites.other["official-artwork"].front_default;
      });
  }
  for (let i = 0; i < maindata.evolution[2].length; i++) {
    await fetch(
      `http://pokeapi.co/api/v2/pokemon/${maindata.evolution[2][i].name}`
    )
      .then((data) => data.json())
      .then((data) => {
        maindata.evolution[2][i].image =
          data.sprites.other["official-artwork"].front_default;
      });
  }
  return maindata;
}
module.exports = {
  getDataPokemonNumbers,
  getDataPokemonName,
};