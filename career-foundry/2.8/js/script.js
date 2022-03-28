// Begin IIFE
//Pokemon Repository list of Pokemon
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  //Other API functions start

  // Load list fetch from API
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // Load details fetch from API
  function loadDetails (item) {
    let url = item.detailsUrl;
    return fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (details) {
      item.imageUrl = details.sprites.front_default,
      item.height = details.height,
      item.types = details.types
    }).catch(function (e) {
      console.error(e);
    });
  }

  

  //End Other API Functions

  //Public Functions
  function getAll(pokemon) {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function (){
      console.log(pokemon);
    });
  }

  function addListener(button, pokemon) {
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }
  

  //Pass public functions to return
  return {
    add: add,
    getAll: getAll,
    addListener: addListener,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    
  };
})();

// End IIFE

//For each loop, create button, return data
function addListItem(pokemon) {
  pokemonRepository.getAll().forEach(function (pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    pokemonList.appendChild(button);
    button.innerText = pokemon.name;
    button.classList.add("button-list");
    pokemonList.appendChild(listItem);
    pokemonRepository.addListener(button, pokemon);
  });
}

// Load pokemon list forEach loop
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    addListItem(pokemon);
  });


// Modals

function showModal () {
  let modalContainer = document.querySelector ('#modal-container');
  modalContainer.classList.add('is-visible');
}

document.querySelector('#show-modal').addEventListener('click', () => {
  showModal();
});



});




addListItem();
