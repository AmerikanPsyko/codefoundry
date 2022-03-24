// Begin IIFE
//Pokemon Repository list of Pokemon
let pokemonRepository = (function () {
  let pokemonList = [
    { name: "Bulbasaur", type: "Grass", height: 7 },
    { name: "Charizard", type: "Fire", height: 5 },
    { name: "Pikachu", type: "Electric", height: 3 },
    { name: "Evee", type: "Dark", height: 4 },
  ];

  //Function that will return all pokemon, retrieved from: pokemonList
  function getAll(pokemon) {
    return pokemonList;
  }

  //Function that will add pokemon, and push to: pokemonList
  function add(pokemon) {
    pokemonList.push(pokemon);
  }
  
  function addListener(button, pokemon) {
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    console.log(pokemon.name);
  }

  function addListItem(pokemon) {
    pokemonRepository.getAll().forEach(function (pokemon) {
      let pokemonList = document.querySelector(".pokemon-list");

      let listItem = document.createElement("li");

      let button = document.createElement("button");

      pokemonList.appendChild(button);

      button.innerText = pokemon.name;

      button.classList.add("button-list");

      pokemonList.appendChild(listItem);

      addListener(button, pokemon);
    });
  }

  //Return for add/getAll
  return {
    add: add,
    getAll: getAll,
  };


  addListItem();
})();

