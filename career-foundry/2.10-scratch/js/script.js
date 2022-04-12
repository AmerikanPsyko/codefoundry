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
          (item.height = details.height),
          (item.types = details.types);
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //Start Modal Section
  function showModal(pokemon) {
    let modalContainer = document.querySelector(".modal");
    let modal = document.querySelector(".modal");

    //Start Modal Close functions
    let closeButtonElement = document.querySelector(".btn-close");
    closeButtonElement.addEventListener("click", hideModal);

    window.addEventListener("keydown", (e) => {
      let modalContainer = document.querySelector(".modal");
      if (
        e.key === "Escape" &&
        modalContainer.classList.contains("is-visible")
      ) {
        hideModal();
      }
    });

    modalContainer.addEventListener("click", (e) => {
      let target = e.target;

      if (target === modalContainer) {
        hideModal();
      }
    });
    //End Modal Close Functions

    //Modal Title and Body (Shows Modal Content)
    let titleElement = document.querySelector(".modal-title");
    titleElement.innerText = pokemon.name;
    let contentElement = document.querySelector(".modal-body");
    contentElement.innerText = pokemon.height;

    //Image Element
    let imageElement = document.createElement("img");

    imageElement.classList.add("image-class");
    imageElement.setAttribute("src", pokemon.imageUrl);
    titleElement.append(imageElement);

    //Modal Clear

    //Button Element to trigger Modal
    let button = document.querySelector("#show-modal");
    button.setAttribute("type", "button");
    modalContainer.classList.add("is-visible");
  }

  //Show and hide Modal
  document.querySelector("#show-modal").addEventListener("click", () => {
    showModal(pokemon);
  });

  function hideModal() {
    let modalContainer = document.querySelector(".modal");
    modalContainer.classList.remove("is-visible");
  }
  // End Modal Section

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
    showModal: showModal,
    hideModal: hideModal,
  };
})();

// End IIFE

//For each loop, create button, return data
function addListItem(pokemon) {
  pokemonRepository.getAll().forEach(function (pokemon) {
    let pokemonList = document.querySelector(".list-group");
    let listItem = document.createElement("group-list-item");

    let button = document.createElement("button");
    pokemonList.append(button);
    button.innerText = pokemon.name;

    button.classList.add("btn-danger", "btn", "rounded-pill");
    button.setAttribute("type", "button");
    button.setAttribute("style", "height: 75px");

    pokemonList.append(listItem);
    pokemonRepository.addListener(button, pokemon);
  });
}

// Load pokemon list forEach loop
pokemonRepository.loadList().then(function () {
  addListItem();
});

// addListItem();
