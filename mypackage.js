function isPrime(number) {
  if (number < 2) {
    return false;
  }
  for (let i = 2; i < number; i++) {
    if (number % i == 0) {
      return false;
    }
  }
  return true;
}
function isPrimes(array) {
  let ans = [];
  for (let i = 0; i < array.length; i++) {
    ans.push(isPrime(array[i]));
  }
  return ans;
}
function toNumberfromArray(array) {
  let ans = [];
  for (let i = 0; i < array.length; i++) {
    ans.push(Number(array[i]));
  }
  return ans;
}
module.exports = {
  isPrime,
};
function onRequest(request, response) {
  let pathname = url.parse(request.url).pathname;
  let parentFolder = path.dirname(pathname);
  console.log(parentFolder);
  // Head of HTML
  let HeadDataOfHTML = fs.readFileSync(pathname).split("</head>")[0];
  response.write(HeadDataOfHTML);
  // CSS
  let CSSfiles = fs.readdirSync(parentFolder + "/CSS");
  for (let i = 0; i < CSSfiles.length; i++) {
    let CSSdata = fs.readFileSync(CSSfiles[i]);
    response.write(`\n<style>${CSSdata}</style>\n`);
  }
  // Body of HTML
  let BodyDataOfHTML = fs
    .readFileSync(pathname)
    .split("</head>")[1]
    .split("</body>")[0];
  response.write(`\n</head>\n<BodyDataOfHTML`);
  // JS
  let JSfiles = fs.readdirSync(parentFolder + "/JS");
  for (let i = 0; i < JSfiles.length; i++) {
    let JSdata = fs.readFileSync(JSfiles[i]);
    response.write(`\n<style>${JSdata}</style>\n`);
  }
  // Foot of HTML
  let FootDataOfHTML = fs
    .readFileSync(pathname)
    .split("</head>")[1]
    .split("</body>")[1];
  response.write(`\n</body>\n${FootDataOfHTML}`);
  // Ending
  response.end();
}
function getEvolutionChains(rawEvolution) {
  let evolution = [];
  let generation1 = [];
  let generation2 = [];
  fetch(`http://pokeapi.co/api/v2/pokemon/${rawEvolution.species.name}`)
    .then((data) => data.json())
    .then((data) => {
      rawEvolution.species.url = data.sprites.other["official-artwork"].front_default;
      evolution.push(rawEvolution.species);
      // console.log(evolution);
      if (rawEvolution.evolves_to !== 0) {
        for (let i1 = 0; i1 < rawEvolution.evolves_to.length; i1++) {
          fetch(`http://pokeapi.co/api/v2/pokemon/${rawEvolution.evolves_to[i1].species.name}`)
            .then((data) => data.json())
            .then((data) => {
              rawEvolution.evolves_to[i1].species.url = data.sprites.other["official-artwork"].front_default;
              generation1.push(rawEvolution.evolves_to[i1].species);
              // console.log(evolution);
              if (rawEvolution.evolves_to[i1].evolves_to !== 0) {
                for (let i2 = 0; i2 < rawEvolution.evolves_to[i1].evolves_to.length; i2++) {
                  fetch(`http://pokeapi.co/api/v2/pokemon/${rawEvolution.evolves_to[i1].evolves_to[i2].species.name}`)
                    .then((data) => data.json())
                    .then((data) => {
                      rawEvolution.evolves_to[i1].evolves_to[i2].species.url = data.sprites.other["official-artwork"].front_default;
                      generation2.push(rawEvolution.evolves_to[i1].evolves_to[i2].species.name);
                      console.log(evolution);
                    })
                }
              }
            })
        }
      }
    })
  evolution.push(generation1);
  evolution.push(generation2);
  console.log(evolution);
  return evolution;
}




for (let i = 0; i <= evolution_group.childNodes.length; i++) {
  evolution_group.removeChild(evolution_group.childNodes[i]);
}
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
card_img1_top.src = response.evolution_chains[0].image;
let card1_body = document.createElement("div");
card1_body.classList.add("card-body");
let card1_text = document.createElement("div");
card1_text.classList.add("card-text");
card1_text.classList.add("mx-auto");
card1_text.classList.add("text-center");
card1_text.innerHTML = response.evolution_chains[0].name;
// POSITION OF CARD 1
evolution_group.appendChild(row1);
row1.appendChild(card1);
card1.appendChild(card_img1_top);
card1.appendChild(card1_body);
card1_body.appendChild(card1_text);
// CREATE DATA FOR CARD 2
if (response.evolution_chains[1].length !== 0) {
  let row2 = document.createElement("div");
  row2.classList.add("row");
  let card_to = document.createElement("div");
  card_to.classList.add("text-center");
  card_to.classList.add("mx-auto");
  card_to.innerHTML = "To";
  evolution_group.appendChild(card_to);
  for (let i = 0; i < response.evolution_chains[1].length; i++) {
    // CREATE DATA FOR CARD 2
    let card2 = document.createElement("div");
    card2.classList.add("card");
    card2.classList.add("col-3");
    card2.classList.add("mx-auto");
    let card_img2_top = document.createElement("img");
    card_img2_top.classList.add("card-img-top");
    card_img2_top.src = response.evolution_chains[1][i].image;
    let card2_body = document.createElement("div");
    card2_body.classList.add("card-body");
    let card2_text = document.createElement("div");
    card2_text.classList.add("card-text");
    card2_text.classList.add("mx-auto");
    card2_text.classList.add("text-center");
    card2_text.innerHTML = response.evolution_chains[1][i].name;
    // POSITION OF CARD 2
    evolution_group.appendChild(row2);
    row2.appendChild(card2);
    card2.appendChild(card_img2_top);
    card2.appendChild(card2_body);
    card2_body.appendChild(card2_text);
  }
}
if (response.evolution_chains[2].length !== 0) {
  let row3 = document.createElement("div");
  row3.classList.add("row");
  let card_to = document.createElement("div");
  card_to.classList.add("mx-auto");
  card_to.classList.add("text-center");
  card_to.innerHTML = "To";
  evolution_group.appendChild(card_to);
  for (let i = 0; i < response.evolution_chains[2].length; i++) {
    // CREATE DATA FOR CARD 3
    let card3 = document.createElement("div");
    card3.classList.add("card");
    card3.classList.add("col-3");
    card3.classList.add("mx-auto");
    let card_img3_top = document.createElement("img");
    card_img3_top.classList.add("card-img-top");
    card_img3_top.src = response.evolution_chains[2][i].image;
    let card3_body = document.createElement("div");
    card3_body.classList.add("card-body");
    let card3_text = document.createElement("div");
    card3_text.classList.add("card-text");
    card3_text.classList.add("mx-auto");
    card3_text.classList.add("text-center");
    card3_text.innerHTML = response.evolution_chains[2][i].name;
    // POSITION OF CARD 3
    evolution_group.appendChild(row3);
    row3.appendChild(card3);
    card3.appendChild(card_img3_top);
    card3.appendChild(card3_body);
    card3_body.appendChild(card3_text);
  }
}
infoPanel.click();