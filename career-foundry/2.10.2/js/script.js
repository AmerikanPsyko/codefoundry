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
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        (item.imageUrl = details.sprites.front_default),
          (item.height = details.height);
          (item.weight = details.weight);
          (item.abilities = []);
          for (let i=0; i < details.abilities.length; i++) {
            item.abilities.push(details.abilities[i].ability.name);
          }
          (item.types = details.types);
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //Modal section

  function showModal(item) {
    
    let modalTitle = document.querySelector('.modal-title'); 
    let modalBody = document.querySelector('.modal-body'); 
    

    let pokemonName = $('<h2>' + item.name + '</h2>');

    let pokemonHeight = $('<p>' + 'Height: ' + item.height + '</p>');

    let pokemonWeight = $('<p>' + 'Weight: ' + item.weight + '</p>');

    let pokemonAbilities = $('<p>' + 'Abilities: ' + item.abilities + '</p>');

    let pokemonImage = $('<img class=\'pokemon-modal-image\'>');
    pokemonImage.attr('src', item.imageUrl); 

    document.querySelector("#Pokemon").addEventListener("click", () => {
      showModal();
    });
    

    modalTitle.append(pokemonName); 
    modalBody.append(pokemonImage); 
    modalBody.append(pokemonHeight); 
    modalBody.append(pokemonWeight); 
    modalBody.append(pokemonAbilities); 
  }
  

  // End Modals

  //End Other API Functions

  //Public Functions
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
    let pokemonList = document.querySelector(".list-group");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    pokemonList.appendChild(button);
    button.innerText = pokemon.name;
    button.classList.add("btn-primary");
    pokemonList.appendChild(listItem);
    pokemonRepository.addListener(button, pokemon);
  });
}

// Load pokemon list forEach loop
pokemonRepository.loadList().then(function () {
  addListItem();
});

addListItem();
