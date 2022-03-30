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

  //Modal section

  function showModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.add('is-visible');
  }
  
  document.querySelector('#show-modal').addEventListener('click', () => {
    showModal();
  });

  function showModal(pokemon) {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    window.addEventListener('keydown', (e) => {
      let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();
        }
    });

    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name;

    let contentElement = document.createElement('p');
    contentElement.innerText = pokemon.height;

    let imageElement = document.createElement("img");
    imageElement.classList.add("image-class");
    imageElement.setAttribute ("src", pokemon.imageUrl);

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');

    

  

    

  }

  document.querySelector('#show-modal').addEventListener('click', () => {
    showModal('Modal Title', 'This is the modal content');
  });

  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
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
    loadDetails(pokemon).then(function (){
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
  addListItem();
  
});

addListItem();
