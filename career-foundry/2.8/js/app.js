// IIFE

//Pokemon Repo
let pokemonRepository = function () {
  let pokeList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  // Load details from API
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        (item.imageUrl = details.sprites.front_default),
          (item.height = details.height),
          (item.types = details.types);
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // Public Functions

  function getAll(pokemon) {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  function addListener(button, pokemon) {
      button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }








  
};
//IIFE End
